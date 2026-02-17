import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

// Load .env file
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
dotenv.config({ path: path.resolve(dirname, '../.env') })

console.log('--- S3 Connection Test Script ---')
const client = new S3Client({
  endpoint: process.env.SUPABASE_S3_ENDPOINT,
  region: process.env.S3_REGION || 'ap-southeast-2',
  credentials: {
    accessKeyId: process.env.SUPABASE_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.SUPABASE_SECRET_ACCESS_KEY || '',
  },
  forcePathStyle: true,
})

async function testConnection() {
  try {
    const bucket = process.env.SUPABASE_BUCKET_NAME || 'payload_media'
    
    console.log('\n1. Generating Signed URL for Zeekeo.png...')
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: 'Zeekeo.png',
    })
    const url = await getSignedUrl(client, command, { expiresIn: 3600 })
    console.log('Signed URL:', url)

    console.log('\n2. Testing Curl on Signed URL...')
  } catch (err) {
    console.error('\n❌ Error!')
    if (err instanceof Error) {
        console.error('Message:', err.message)
    }
  }
}

testConnection()
