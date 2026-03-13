import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

export const GET = async (request: Request) => {
  const payload = await getPayload({ config })

  // Check if the user is authenticated
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

  const results: { filename: string; status: string; cloudflareId?: string; error?: string }[] = []

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
        const mediaDoc = doc as typeof doc & { cloudflareImageId?: string | null }
        const docFilename = mediaDoc.filename || `image_${mediaDoc.id}`

        // Skip if already migrated
        if (mediaDoc.cloudflareImageId) {
          results.push({ filename: docFilename, status: 'skipped (already migrated)' })
          continue
        }

        try {
          // Build the download URL — afterRead hook already rewrites /s3/ to /object/public/
          const imageUrl = mediaDoc.url

          if (!imageUrl || !imageUrl.startsWith('http')) {
            results.push({
              filename: docFilename,
              status: 'skipped',
              error: `No valid URL: ${mediaDoc.url}`,
            })
            continue
          }

          // Download from Supabase
          const downloadRes = await fetch(imageUrl)
          if (!downloadRes.ok) {
            results.push({
              filename: docFilename,
              status: 'failed',
              error: `Download failed: ${downloadRes.statusText}`,
            })
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

          const cfData = (await cfRes.json()) as {
            success: boolean
            result?: { id: string }
            errors?: { message: string }[]
          }

          if (!cfData.success || !cfData.result) {
            results.push({
              filename: docFilename,
              status: 'failed',
              error: `Cloudflare: ${JSON.stringify(cfData.errors)}`,
            })
            continue
          }

          // Save the Cloudflare image ID back to Payload
          await payload.update({
            collection: 'media',
            id: mediaDoc.id,
            data: { cloudflareImageId: cfData.result.id } as Record<string, unknown>,
          })

          results.push({
            filename: docFilename,
            status: 'migrated',
            cloudflareId: cfData.result.id,
          })
        } catch (err) {
          results.push({
            filename: docFilename,
            status: 'error',
            error: err instanceof Error ? err.message : String(err),
          })
        }
      }

      hasMore = hasNextPage
      page++
    }
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    )
  }

  const migrated = results.filter((r) => r.status === 'migrated').length
  const skipped = results.filter((r) => r.status.startsWith('skipped')).length
  const failed = results.filter((r) => r.status === 'failed' || r.status === 'error').length

  return NextResponse.json({
    summary: { total: results.length, migrated, skipped, failed },
    results,
  })
}
