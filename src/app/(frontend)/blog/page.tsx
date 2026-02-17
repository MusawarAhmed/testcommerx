import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import BlogPageClient from './BlogPageClient'

export default async function BlogPage() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 100,
    overrideAccess: false,
  })

  const categories = await payload.find({
    collection: 'categories',
    depth: 0,
    limit: 100,
    overrideAccess: false,
  })

  return <BlogPageClient posts={posts.docs} categories={categories.docs} />
}
