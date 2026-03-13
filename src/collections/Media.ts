import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'


import { authenticated } from '../access/authenticated'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  folders: true,
  access: {
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  hooks: {
    afterRead: [
      ({ doc }) => {
        const cfHash = process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH
        const cfDeliveryUrl = process.env.NEXT_PUBLIC_CLOUDFLARE_DELIVERY_URL || 'imagedelivery.net'

        // If this image has been migrated to Cloudflare, rewrite ALL urls
        if (doc.cloudflareImageId && cfHash) {
          const baseUrl = cfDeliveryUrl.startsWith('http')
            ? cfDeliveryUrl.replace(/\/$/, '')
            : `https://${cfDeliveryUrl.replace(/\/$/, '')}`

          doc.url = `${baseUrl}/${cfHash}/${doc.cloudflareImageId}/public`

          // Also rewrite all size variant URLs so thumbnails etc. come from CF
          if (doc.sizes) {
            for (const sizeKey of Object.keys(doc.sizes)) {
              if (doc.sizes[sizeKey]?.url) {
                doc.sizes[sizeKey].url = `${baseUrl}/${cfHash}/${doc.cloudflareImageId}/public`
              }
            }
          }

          return doc
        }

        // Fallback: Fix Supabase URL for non-migrated images
        if (doc.url && doc.url.includes('supabase.co') && doc.url.includes('/s3/')) {
          doc.url = doc.url.replace('/s3/', '/object/public/')
        }
        return doc
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      //required: true,
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
    {
      name: 'cloudflareImageId',
      type: 'text',
      admin: {
        hidden: true,
      },
    },
  ],
  upload: {
    // Upload to the public/media directory in Next.js making them publicly accessible even outside of Payload
    // staticDir: path.resolve(dirname, '../../public/media'),
    // staticDir: '/tmp',
    staticDir: path.resolve(dirname, '../../public/media'),
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        name: 'small',
        width: 600,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'large',
        width: 1400,
      },
      {
        name: 'xlarge',
        width: 1920,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
      },
    ],
  },
}
