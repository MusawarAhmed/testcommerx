"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Post, Category } from '@/payload-types';
import { Media as MediaComponent } from '@/components/Media';
import CTASection from '../_components/common/CTASection';

interface BlogPageClientProps {
    posts: Post[];
    categories: Category[];
}

const ArrowIcon = ({ color = "#D02030", className = "" }) => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M1 6H11" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 1L11 6L6 11" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

export default function BlogPageClient({ posts, categories }: BlogPageClientProps) {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredPosts = activeCategory === "All"
        ? posts
        : posts.filter(post => {
            const postCategories = post.categories;
            if (!postCategories) return false;
            return postCategories.some(cat => {
                if (typeof cat === 'object' && cat !== null && 'title' in cat) {
                    return cat.title === activeCategory;
                }
                return false;
            });
        });

    const categoryTitles = ["All", ...categories.map(c => c.title)];

    return (
        <main className="min-h-screen bg-white relative overflow-hidden">
            {/* Top Background Pattern */}
            <div className="absolute -top-25 -left-125 w-[800px] h-[900px] z-0 pointer-events-none">
                <Image
                    src="/home-insight-sec-bg.svg"
                    alt="Background Pattern"
                    fill
                    className="object-contain object-top-left"
                />
            </div>

            {/* Bottom Background Pattern */}
            <div className="absolute top-[35%] -right-116 w-[800px] h-[900px] z-0 pointer-events-none rotate-180">
                <Image
                    src="/home-insight-sec-bg.svg"
                    alt="Background Pattern"
                    fill
                    className="object-contain"
                />
            </div>

            {/* Hero Section */}
            <section className="site-containers pt-40 pb-16 text-center relative z-10">
                <div className="inline-block px-4 py-1.5 rounded-full bg-[#FFEAEB] text-[#D02030] text-[12px] font-bold tracking-wider uppercase mb-6">
                    Blog
                </div>

                <h1 className="text-[48px] md:text-[64px] font-bold text-black leading-tight mb-6 max-w-4xl mx-auto">
                    Explore our blog for expert knowledge and inspiration
                </h1>

                <p className="text-[16px] text-black mx-auto">
                    Stay connected with us by subscribing to our blog updates.
                </p>

                {/* Categories Tab */}
                <div className="mt-12 flex flex-wrap justify-center gap-3">
                    {categoryTitles.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2 rounded-full border transition-all text-[16px] md:text-[24px] cursor-pointer font-medium ${activeCategory === cat
                                ? "bg-[#D02030] text-white border-[#D02030]"
                                : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            {/* Blog Grid */}
            <section className="site-containers pb-32 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                    {filteredPosts.map((post) => (
                        <Link href={`/blog/${post.slug}`} key={post.id} className="block group cursor-pointer bg-[#F3F6FD] rounded-[8px] p-[24px]">
                            <div className="relative aspect-video w-full overflow-hidden rounded-[4px] mb-6">
                                {post.heroImage && (
                                     <MediaComponent
                                        resource={post.heroImage}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                )}
                            </div>

                            <h2 className="text-2xl font-bold text-black mb-3 leading-tight group-hover:text-[#D02030] transition-colors">
                                {post.title}
                            </h2>

                            <p className="text-[14px] font-normal text-gray-600 mb-6 line-clamp-3">
                                {post.meta?.description || ''}
                            </p>

                            <div className="inline-flex items-center gap-2 text-[#D02030] font-bold text-[16px] tracking-wide group-hover:gap-3 transition-all pt-2">
                                Read Article
                                <ArrowIcon color="#D02030" className="w-4 h-4" />
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <CTASection />
        </main>
    );
}
