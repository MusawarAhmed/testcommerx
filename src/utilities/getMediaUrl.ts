import { getClientSideURL } from '@/utilities/getURL'

/**
 * Processes media resource URL to ensure proper formatting
 * @param url The original URL from the resource
 * @param cacheTag Optional cache tag to append to the URL
 * @returns Properly formatted URL with cache tag if provided
 */
export const getMediaUrl = (url: string | null | undefined, cacheTag?: string | null): string => {
  if (!url) return ''

  if (cacheTag && cacheTag !== '') {
    cacheTag = encodeURIComponent(cacheTag)
  }

  let finalUrl = url
  // Check if URL already has http/https protocol
  if (url.startsWith('http://') || url.startsWith('https://')) {
    finalUrl = cacheTag ? `${url}?v=${cacheTag}` : url
  } else {
    // Otherwise prepend client-side URL
    const baseUrl = getClientSideURL()
    finalUrl = cacheTag ? `${baseUrl}${url}?v=${cacheTag}` : `${baseUrl}${url}`
  }

  console.log(`[getMediaUrl] Input: ${url}, Output: ${finalUrl}`)
  return finalUrl
}
