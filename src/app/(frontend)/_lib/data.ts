import { getPayload } from 'payload'
import config from '@payload-config'
import { HomePageData } from './api'

export async function getHomePageData(): Promise<HomePageData | null> {
  const payload = await getPayload({ config })

  try {
    // Determine page ID (hardcoded as '2' in original code)
    const pageId = '2'

    const page = await payload.findByID({
      collection: 'pages',
      id: pageId,
      depth: 2,
      draft: false, // Ensure we fetch published data
    })

    if (!page) {
      console.warn(`[data] Home page (id=${pageId}) not found.`)
      return null
    }

    // Cast the Result used by Payload to our HomePageData interface
    return page as unknown as HomePageData
  } catch (error) {
    console.error("[data] Error fetching home page data:", error)
    return null
  }
}

export async function getBlogs() {
    return { docs: [] };
}

export async function getBlogBySlug(_slug: string) {
    return { docs: [] };
}
