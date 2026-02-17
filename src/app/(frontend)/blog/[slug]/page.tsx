import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CTASection from '../../_components/common/CTASection';
import ShareButtons from '../../_components/blog/ShareButtons';
import { BLOG_POSTS } from '../../_lib/dummy-data';

// Force dynamic rendering to handle params correctly if needed, though for static export simpler
export const dynamic = 'force-static';
export const dynamicParams = true;

// Generate static params for all known blog posts (using slugs)
export async function generateStaticParams() {
    return BLOG_POSTS.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = BLOG_POSTS.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    // Get recommended posts (exclude current one, take 3)
    const recommendedPosts = BLOG_POSTS
        .filter(p => p.id !== post.id)
        .slice(0, 3);

    return (
        <main className="min-h-screen bg-white relative overflow-hidden">
            {/* Top Background Pattern */}
            {/* <div className="absolute -top-25 -left-125 w-[800px] h-[900px] z-0 pointer-events-none">
                <Image
                    src="/home-insight-sec-bg.svg"
                    alt="Background Pattern"
                    fill
                    className="object-contain object-top-left"
                />
            </div> */}

            <section className="site-containers pt-32 pb-12 relative z-10">
                {/* Breadcrumb / Layout spacer */}
                <div className="mb-8">
                    <Link href="/blog" className="inline-flex items-center text-sm font-sans text-gray-500 hover:text-[#D02030] transition-colors">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                        Back to Blog
                    </Link>
                </div>

                {/* Header Info - Removed Date/Author from here */}
                <div className="mx-auto text-center mb-12">
                    {/* <div className="inline-block px-4 py-1.5 rounded-full bg-[#FFEAEB] text-[#D02030] text-[12px] font-bold tracking-wider uppercase mb-6">
                        {post.category}
                    </div> */}
                    <h1 className="text-[32px] md:text-[56px] font-cal text-black leading-tight">
                        {post.title}
                    </h1>
                    <p className="text-[16px] font-sans text-black mx-auto">
                        Stay connected with us by subscribing to our blog updates, by doing so, you&apos;ll receive notifications whenever we publish new articles.
                    </p>
                </div>

                {/* Featured Image */}
                <div className="relative aspect-video w-full rounded-[4px] overflow-hidden shadow-lg">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </section>

            {/* Content Section with Background Color */}
            <section className="py-10 md:py-16 relative z-10">
                <div className="site-containers">
                    <article className="mx-auto p-[20px] md:p-[80px] bg-[#F3F6FD] font-sans text-gray-700 leading-relaxed text-[17px]
                        [&_p]:mb-6 [&_h2]:text-[32px] [&_h2]:font-cal [&_h2]:text-black [&_h2]:mt-12 [&_h2]:mb-6
                        [&_h3]:text-[24px] [&_h3]:font-cal [&_h3]:text-black [&_h3]:mt-10 [&_h3]:mb-4
                        [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-2 [&_li]:marker:text-[#D02030]
                        [&_quote]:block [&_quote]:border-l-4 [&_quote]:border-[#D02030] [&_quote]:pl-6 [&_quote]:italic [&_quote]:text-[20px] [&_quote]:font-medium [&_quote]:text-black/80 [&_quote]:my-10 [&_quote]:bg-white [&_quote]:p-6 [&_quote]:rounded-r-lg
                    ">
                        {/* Intro / Description */}
                        <p className="text-[20px] md:text-[24px] font-normal leading-relaxed text-black/90 mb-10">
                            {post.description}
                        </p>

                        <hr className="border-gray-200 mb-10" />

                        {/* Main Content (rendering HTML string safely) */}
                        <div dangerouslySetInnerHTML={{ __html: post.content || '' }} />

                        {/* Author & Share Footer */}
                        <div className="mt-5 pt-8">
                            <div className="flex flex-col gap-6 items-start">
                                {/* Author Info */}
                                <div>
                                    <p className="text-sm font-sans text-black mb-0!">Author</p>
                                    <p className="text-[32px] font-medium font-sans text-black m-0!">
                                        {post.author}
                                    </p>
                                </div>

                                {/* Share Buttons */}
                                <div>
                                    <ShareButtons title={post.title} slug={post.slug} />
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </section>

            {/* Recommended Posts */}
            <section className="bg-white py-10 md:py-20 relative z-10">
                <div className="site-containers">
                    <h2 className="text-3xl font-cal text-black mb-12 text-center">Recommended Posts</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {recommendedPosts.map((recPost) => (
                            <Link href={`/blog/${recPost.slug}`} key={recPost.id} className="group cursor-pointer bg-[#F3F6FD] rounded-[8px] p-[24px] hover:shadow-md transition-all h-full flex flex-col">
                                <div className="relative aspect-video w-full overflow-hidden rounded-[4px] mb-6">
                                    <Image
                                        src={recPost.image}
                                        alt={recPost.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>

                                <h2 className="text-xl font-cal text-black mb-3 leading-tight group-hover:text-[#D02030] transition-colors line-clamp-2">
                                    {recPost.title}
                                </h2>

                                <p className="font-sans text-[14px] font-normal text-gray-600 mb-6 line-clamp-3">
                                    {recPost.description}
                                </p>

                                <button className="mt-auto px-5 py-2 rounded-full border border-[#D02030] text-black text-[12px] cursor-pointer font-sans font-medium transition-all hover:bg-[#D02030] hover:text-white self-start">
                                    Read Article
                                </button>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <CTASection />
        </main>
    );
}
