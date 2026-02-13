import type { Payload, File } from 'payload'
import { BLOG_POSTS, CATEGORIES } from './blog-posts-data'

export const seedBlogPosts = async ({
  payload,
}: {
  payload: Payload
}): Promise<void> => {
  payload.logger.info('Seeding blog posts...')

  // 1. Ensure Categories Exist
  payload.logger.info('— Seeding categories...')
  const categoryDocs = await Promise.all(
    CATEGORIES.map(async (category) => {
      const existingCategory = await payload.find({
        collection: 'categories',
        where: {
            title: {
                equals: category
            }
        },
        limit: 1,
      })

      if (existingCategory.docs.length > 0) {
        return existingCategory.docs[0]
      }

      return payload.create({
        collection: 'categories',
        data: {
          title: category,
          slug: category.toLowerCase().replace(/ /g, '-'),
        },
      })
    })
  )

  // Helper to get category ID by name
  const getCategoryId = (name: string) => {
    const cat = categoryDocs.find((c) => c.title === name)
    return cat ? cat.id : null
  }

  // 2. Iterate through posts
  for (const post of BLOG_POSTS) {
    payload.logger.info(`— Processing post: ${post.title}`)

    // Check if post exists
    const existingPost = await payload.find({
      collection: 'posts',
      where: {
        slug: {
          equals: post.slug,
        },
      },
      limit: 1,
    })

    if (existingPost.docs.length > 0) {
      payload.logger.info(`— Post already exists, skipping: ${post.title}`)
      continue
    }

    // 3. Handle Author (User)
    // We'll try to find a user with this name, or create a dummy one if strictly needed.
    // For simplicity, let's look for "Demo Author" or create one specific to the post author
    let authorId
    const existingAuthor = await payload.find({
        collection: 'users',
        where: {
            name: {
                equals: post.author
            }
        },
        limit: 1
    })

    if (existingAuthor.docs.length > 0) {
        authorId = existingAuthor.docs[0].id
    } else {
        // Create new author
        const password = 'password123' // In a real scenario, this would be secure or random
        const email = `${post.author.toLowerCase().replace(/ /g, '.')}@example.com`
        
        // Check if email exists
         const existingEmail = await payload.find({
            collection: 'users',
            where: {
                email: {
                    equals: email
                }
            },
            limit: 1
        })

        if (existingEmail.docs.length > 0) {
             authorId = existingEmail.docs[0].id
        } else {
            const newAuthor = await payload.create({
                collection: 'users',
                data: {
                    name: post.author,
                    email: email,
                    password: password
                }
            })
            authorId = newAuthor.id
        }
    }


    // 4. Handle Media
    let mediaId
    try {
        const file = await fetchFileByURL(post.image)
        const media = await payload.create({
            collection: 'media',
            data: {
                alt: post.title,
            },
            file: file
        })
        mediaId = media.id
    } catch (error) {
        payload.logger.error(`Failed to upload image for post ${post.title}: ${error}`)
         // Fallback? Or just continue without hero image
    }

    // 5. Convert HTML to Lexical
    // This is a simplified manual conversion based on the known structure of the provided HTML
    const lexicalContent = convertHtmlToLexical(post.content)

    // 6. Create Post
    await payload.create({
      collection: 'posts',
      data: {
        title: post.title,
        slug: post.slug,
        publishedAt: new Date(post.date).toISOString(),
        _status: 'published',
        authors: [authorId],
        categories: [getCategoryId(post.category)].filter((id) => id !== null),
        heroImage: mediaId,
        content: lexicalContent,
        meta: {
            title: post.title,
            description: post.description,
            image: mediaId
        }
      },
    })
  }

  payload.logger.info('Seeding blog posts completed!')
}

async function fetchFileByURL(url: string): Promise<File> {
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`)
  }

  const data = await res.arrayBuffer()

  return {
    name: url.split('/').pop()?.split('?')[0] || `file-${Date.now()}.jpg`,
    data: Buffer.from(data),
    mimetype: 'image/jpeg', // Assuming Unsplash images are jpegs or we default to it
    size: data.byteLength,
  }
}

// Simple HTML to Lexical converter for the specific structure we have
function convertHtmlToLexical(html: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rootChildren: any[] = []

    // Split by tags to find content
    // This is a naive parser suitable for the specific input which is well-structured
    
    // Remove leading/trailing whitespace from html
    const cleanHtml = html.trim()
    
    // We will use regex to find tags and their content
    // Supported tags in input: <p>, <h2>, <ul><li>, <quote> (which seems to be custom, map to blockquote maybe?)
    
    // Split into blocks based on top-level tags
    // This regex looks for: <tag>content</tag>
    const tagRegex = /<(p|h2|ul|quote)>(.*?)<\/\1>/gs
    
    let match
    while ((match = tagRegex.exec(cleanHtml)) !== null) {
        const tag = match[1]
        const content = match[2].trim()
        
        if (tag === 'p') {
            rootChildren.push({
                type: 'paragraph',
                children: [
                    {
                        type: 'text',
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: content.replace(/<strong>(.*?)<\/strong>/g, '$1'), // Naive strip of strong tags inside p for now, or handle them
                        version: 1,
                    }
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                textFormat: 0,
                version: 1
            })
        } else if (tag === 'h2') {
             rootChildren.push({
                type: 'heading',
                tag: 'h2',
                children: [
                    {
                        type: 'text',
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: content,
                        version: 1,
                    }
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1
            })
        } else if (tag === 'quote') {
             // Map <quote> to a paragraph with italic or blockquote if available?
             // Let's use paragraph with italic for simplicity or a specialized block if one exists.
             // Or maybe a blockquote? default lexical usually has standard elements.
             // Let's assume standard paragraph but maybe italics?
             // Actually, let's construct a "banner" or similar if we want it to stand out, 
             // but user used <quote>. Let's try to simulate a quote.
             
             // Removing quotes from string if present
             const text = content.replace(/^"|"$/g, '')
             
             rootChildren.push({
                 type: 'paragraph', // or 'quote' if QuoteNode is registered? usually it's 'quote'
                 children: [
                     {
                        type: 'text',
                        detail: 0,
                        format: 2, // Italic
                        mode: 'normal',
                        style: '',
                        text: `"${text}"`,
                        version: 1,
                     }
                 ],
                 direction: 'ltr',
                 format: '',
                 indent: 1, // Indent it
                 textFormat: 0,
                 version: 1,
             })
        } else if (tag === 'ul') {
            // Parse li items
            const liRegex = /<li>(.*?)<\/li>/gs
            const listChildren = []
            let liMatch
            while ((liMatch = liRegex.exec(content)) !== null) {
                const liContent = liMatch[1]
                // Handle <strong> inside li
                // "<strong>Unified Data Strategy:</strong> Breaking down..."
                // We need to parse this mixed content
                
                const children = []
                const strongRegex = /<strong>(.*?)<\/strong>(.*)/s
                const strongMatch = strongRegex.exec(liContent)
                
                if (strongMatch) {
                    children.push({
                        type: 'text',
                        detail: 0,
                        format: 1, // Bold
                        mode: 'normal',
                        style: '',
                        text: strongMatch[1],
                        version: 1,
                    })
                    children.push({
                         type: 'text',
                        detail: 0,
                        format: 0, 
                        mode: 'normal',
                        style: '',
                        text: strongMatch[2],
                        version: 1,
                    })
                } else {
                     children.push({
                        type: 'text',
                        detail: 0,
                        format: 0, 
                        mode: 'normal',
                        style: '',
                        text: liContent,
                        version: 1,
                    })
                }
                
                listChildren.push({
                    type: 'listitem',
                    value: 1,
                    children: children,
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    version: 1
                })
            }
            
            rootChildren.push({
                type: 'list',
                listType: 'bullet',
                children: listChildren,
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1
            })
        }
    }

    return {
        root: {
            type: 'root',
            children: rootChildren,
            direction: 'ltr' as const,
            format: '' as const,
            indent: 0,
            version: 1,
        }
    }
}
