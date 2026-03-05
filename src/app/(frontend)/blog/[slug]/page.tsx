import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import CTASection from '../../_components/common/CTASection';
import ShareButtons from '../../_components/blog/ShareButtons';
import RichText from '@/components/RichText';
import { Media } from '@/components/Media';
import type { Post } from '@/payload-types';

// Force dynamic rendering to handle params correctly if needed, though for static export simpler
export const dynamic = 'force-static';
export const dynamicParams = true;

// Generate static params for all known blog posts (using slugs)
export async function generateStaticParams() {
    const payload = await getPayload({ config: configPromise });
    const posts = await payload.find({
        collection: 'posts',
        limit: 1000,
        select: {
            slug: true,
        },
    });

    return posts.docs.map((post) => ({
        slug: post.slug,
    }));
}

const ArrowIcon = ({ color = "#D02030", className = "" }) => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M1 6H11" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 1L11 6L6 11" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const payload = await getPayload({ config: configPromise });

    const postsResult = await payload.find({
        collection: 'posts',
        where: {
            slug: {
                equals: slug,
            },
        },
        limit: 1,
    });

    const post = postsResult.docs[0];

    if (!post) {
        notFound();
    }

    // Get recommended posts
    let recommendedPosts: Post[] = [];
    if (post.relatedPosts && post.relatedPosts.length > 0) {
        recommendedPosts = post.relatedPosts.filter((p): p is Post => typeof p === 'object').slice(0, 3);
    } else {
        // Fallback: Get most recent posts excluding current one
        const fallbackPosts = await payload.find({
            collection: 'posts',
            limit: 4,
            where: {
                id: {
                    not_equals: post.id,
                },
            },
            sort: '-publishedAt',
        });
        recommendedPosts = fallbackPosts.docs.slice(0, 3);
    }

    const authorName = post.populatedAuthors?.[0]?.name || 'Admin';

    return (
        <main className="min-h-screen bg-white relative overflow-hidden">
            <section className="site-containers pt-32 pb-12 relative z-10">
                {/* Breadcrumb / Layout spacer */}
                <div className="mb-8">
                    <Link href="/blog" className="inline-flex items-center text-sm font-sans text-gray-500 hover:text-[#D02030] transition-colors">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                        Back to Blog
                    </Link>
                </div>

                {/* Header Info */}
                <div className="mx-auto text-center mb-12">
                    <h1 className="text-[32px] md:text-[56px] font-cal text-black leading-tight">
                        {post.title}
                    </h1>
                    <p className="text-[16px] font-sans text-black mx-auto">
                        Stay connected with us by subscribing to our blog updates, by doing so, you&apos;ll receive notifications whenever we publish new articles.
                    </p>
                </div>

                {/* Featured Image */}
                <div className="relative aspect-video w-full rounded-[4px] overflow-hidden shadow-lg">
                    {post.heroImage && (
                        <Media
                            resource={post.heroImage}
                            fill
                            className="object-cover"
                            priority
                        />
                    )}
                </div>
            </section>

            {/* Content Section with Background Color */}
            <section className="py-10 md:py-16 relative z-10">
                <div className="site-containers">
                    <article className="mx-auto p-[20px] md:p-[80px] bg-[#F3F6FD] font-sans text-[#272727] leading-relaxed text-[17px]
                        [&_p]:mb-8 [&_h2]:text-[32px] [&_h2]:font-cal [&_h2]:text-black [&_h2]:mt-12 [&_h2]:mb-8
                        [&_h3]:text-[24px] [&_h3]:font-cal [&_h3]:text-black [&_h3]:mt-10 [&_h3]:mb-6
                        [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-4 [&_li]:marker:text-[#D02030]
                    ">
                        {/* Intro / Description */}
                        {post.meta?.description && (
                            <div className="mb-10">
                                <h1 className="text-[32px] md:text-[40px] font-cal text-black mb-6">Introduction</h1>
                                <p className="text-[18px] md:text-[19px] font-normal leading-relaxed text-[#272727]">
                                    {post.meta.description}
                                </p>
                            </div>
                        )}

                        <div className="mb-12">
                             {post.heroImage && (
                                <Media
                                    resource={post.heroImage}
                                    fill={false}
                                    imgClassName="rounded-[4px] shadow-sm"
                                />
                             )}
                        </div>

                        {/* Main Content */}
                        <RichText 
                            data={post.content} 
                            enableGutter={false} 
                            author={{
                                name: authorName,
                                // In a real app, populate this from user collection
                                avatar: undefined 
                            }}
                        />

                        {/* Author & Share Footer */}
                        <div className="mt-16 pt-12 border-t border-gray-200">
                            <div className="flex flex-col md:flex-row md:items-end justify-between items-start gap-8">
                                {/* Author Info */}
                                <div>
                                    <p className="text-sm font-sans text-black mb-1">Author</p>
                                    <h2 className="text-[32px] font-medium font-sans text-black m-0 leading-tight">
                                        {authorName}
                                    </h2>
                                </div>

                                {/* Share Buttons */}
                                <div>
                                    <ShareButtons title={post.title} slug={post.slug || ''} />
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </section>

            {/* Recommended Posts */}
            {recommendedPosts.length > 0 && (
                <section className="bg-white py-10 md:py-20 relative z-10">
                    <div className="site-containers">
                        <h2 className="text-3xl font-cal text-black mb-12 text-center">Recommended Posts</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {recommendedPosts.map((recPost) => (
                                <Link href={`/blog/${recPost.slug}`} key={recPost.id} className="group cursor-pointer bg-[#F3F6FD] rounded-[8px] p-[24px] hover:shadow-md transition-all h-full flex flex-col">
                                    <div className="relative aspect-video w-full overflow-hidden rounded-[4px] mb-6">
                                        {recPost.heroImage && (
                                            <Media
                                                resource={recPost.heroImage}
                                                fill
                                                imgClassName="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        )}
                                    </div>

                                    <h2 className="text-xl font-cal text-black mb-3 leading-tight group-hover:text-[#D02030] transition-colors line-clamp-2">
                                        {recPost.title}
                                    </h2>

                                    <p className="font-sans text-[14px] font-normal text-gray-600 mb-6 line-clamp-3">
                                        {recPost.meta?.description || ''}
                                    </p>

                                    <div className="mt-auto inline-flex items-center gap-2 text-[#D02030] font-bold text-[16px] tracking-wide group-hover:gap-3 transition-all pt-2">
                                        Read Article
                                        <ArrowIcon color="#D02030" className="w-4 h-4" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <CTASection />
        </main>
    );
}
