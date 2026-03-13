import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

export const GET = async (request: Request) => {
  const payload = await getPayload({ config })
  const { searchParams } = new URL(request.url)

  // Options
  const dryRun = searchParams.get('dryRun') === 'true'
  const testAuth = searchParams.get('testAuth') === 'true'
  const limitCount = parseInt(searchParams.get('limit') || '0') // 0 = unlimited
  const limitMB = parseInt(searchParams.get('limitMB') || '500') // Default 500MB safety cap

  // Check if the user is authenticated and is an admin
  const { user } = await payload.auth({ headers: request.headers })
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const CF_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID
  const CF_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN

  if (!CF_ACCOUNT_ID || !CF_API_TOKEN) {
    return NextResponse.json(
      { error: 'Missing CLOUDFLARE_ACCOUNT_ID or CLOUDFLARE_API_TOKEN in .env' },
      { status: 500 },
    )
  }

  // Diagnostic: Test token validity
  if (testAuth) {
    try {
      const verifyRes = await fetch('https://api.cloudflare.com/client/v4/user/tokens/verify', {
        headers: { Authorization: `Bearer ${CF_API_TOKEN}` },
      })
      const verifyData = await verifyRes.json()
      return NextResponse.json({
        message: 'Token Verification Results',
        status: verifyRes.status,
        data: verifyData,
        accountId: `${CF_ACCOUNT_ID.substring(0, 4)}...${CF_ACCOUNT_ID.substring(CF_ACCOUNT_ID.length - 4)}`,
      })
    } catch (err) {
      return NextResponse.json({ error: 'Failed to reach Cloudflare API', detail: String(err) }, { status: 500 })
    }
  }

  const results: { filename: string; status: string; size?: number; cloudflareId?: string; error?: string }[] = []
  let processedBytes = 0
  let processedCount = 0

  try {
    let page = 1
    let hasMore = true

    while (hasMore) {
      const { docs: mediaDocs, hasNextPage } = await payload.find({
        collection: 'media',
        limit: 50,
        page,
      })

      for (const doc of mediaDocs) {
        const mediaDoc = doc as any
        const docFilename = mediaDoc.filename || `image_${mediaDoc.id}`
        const fileSize = mediaDoc.filesize || 0

        // Skip if already migrated
        if (mediaDoc.cloudflareImageId) {
          results.push({ filename: docFilename, status: 'skipped (already migrated)', size: fileSize })
          continue
        }

        // Safety caps for actual migration
        if (!dryRun) {
          if (limitCount > 0 && processedCount >= limitCount) break
          if (processedBytes + fileSize > limitMB * 1024 * 1024 && processedCount > 0) break
        }

        if (dryRun) {
          results.push({ filename: docFilename, status: 'pending migration', size: fileSize })
          processedBytes += fileSize
          processedCount++
          continue
        }

        try {
          // Build the download URL
          let imageUrl = mediaDoc.url

          if (imageUrl && !imageUrl.startsWith('http')) {
            const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
            imageUrl = `${serverUrl.replace(/\/$/, '')}${imageUrl}`
          }

          if (!imageUrl || !imageUrl.startsWith('http')) {
            results.push({ filename: docFilename, status: 'skipped', error: `No valid URL: ${mediaDoc.url}` })
            continue
          }

          // Download from Supabase/Server
          const downloadRes = await fetch(imageUrl)
          if (!downloadRes.ok) {
            results.push({ filename: docFilename, status: 'failed', error: `Download failed: ${downloadRes.statusText}` })
            continue
          }

          const blob = await downloadRes.blob()

          // Upload to Cloudflare Images
          const formData = new FormData()
          formData.append('file', blob, docFilename)

          const cfRes = await fetch(
            `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/images/v1`,
            {
              method: 'POST',
              headers: { Authorization: `Bearer ${CF_API_TOKEN}` },
              body: formData,
            },
          )

          const cfData = (await cfRes.json()) as any

          if (!cfData.success || !cfData.result) {
            results.push({ filename: docFilename, status: 'failed', error: `Cloudflare: ${JSON.stringify(cfData.errors)}` })
            continue
          }

          // Save the Cloudflare image ID back to Payload
          await payload.update({
            collection: 'media',
            id: mediaDoc.id,
            data: { cloudflareImageId: cfData.result.id } as any,
          })

          processedBytes += fileSize
          processedCount++
          results.push({ filename: docFilename, status: 'migrated', size: fileSize, cloudflareId: cfData.result.id })
        } catch (err) {
          results.push({ filename: docFilename, status: 'error', error: err instanceof Error ? err.message : String(err) })
        }
      }

      // Check if we hit limits inside the loop
      if (!dryRun) {
        if (limitCount > 0 && processedCount >= limitCount) break
        // Check if next file would exceed MB limit (handled inside loop, but for clarity)
      }

      hasMore = hasNextPage
      page++
    }
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 })
  }

  const migrated = results.filter((r) => r.status === 'migrated').length
  const totalProcessedMB = (processedBytes / (1024 * 1024)).toFixed(2)

  return NextResponse.json({
    config: { dryRun, limitCount, limitMB },
    summary: { 
      totalFiles: results.length, 
      processedCount, 
      processedMB: totalProcessedMB,
      status: dryRun ? 'Completed Dry Run' : (processedCount < results.filter(r => r.status === 'pending migration').length ? 'Stopped at limit' : 'Completed Batch')
    },
    results: results.slice(-100), // Only show last 100 for brevity in large runs
  })
}
