
import Image from 'next/image';
import Link from 'next/link';
import { ArrowIcon } from '../layout/Icons';
import { InsightsBlock, Media } from '../../_lib/api';

interface InsightsSectionProps {
    data?: InsightsBlock;
}

export default function InsightsSection({ data }: InsightsSectionProps) {
    if (!data) return null;

    // Helper to get image URL
    const getImageUrl = (image: Media | string | null | undefined) => {
        if (!image) return '';
        if (typeof image === 'string') return image;

        // Prefer explicit size if available, otherwise fallback to main URL
        // However, user requested "larger size".
        // The API returns 'url' at root which is full size.

        // If it starts with http, it is absolute. If /api, it needs base URL if not on same domain, 
        // but Next.js Image handles relative paths if they are local. 
        // Assuming /api/media is proxied or we need full URL.

        const url = image.url;
        if (!url) return '';

        if (url.startsWith('http')) return url;

        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
        return `${serverUrl}${url}`;
    };

    const leftImageUrl = getImageUrl(data.leftImage);
    const bgImageUrl = getImageUrl(data.bgImage);

    return (
        <section className="relative py-20 bg-[#ffffff] overflow-hidden">
            {/* Background Pattern - Positioned in top-left corner and partially hidden */}
            <div className="absolute -top-50 -left-125 w-[800px] h-[900px] z-0  pointer-events-none">
                {bgImageUrl && (
                    <Image
                        src={bgImageUrl}
                        alt="Background Pattern"
                        fill
                        className="object-contain object-top-left"
                    />
                )}
            </div>

            <div className="site-containers relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                    {/* Left side: Image */}
                    <div className="w-full md:w-1/2">
                        <div className="relative aspect-4/3 w-full">
                            {leftImageUrl && (
                                <Image
                                    src={leftImageUrl}
                                    alt={data.leftImage?.alt || data.title}
                                    fill
                                    className="object-cover rounded-xl shadow-2xl"
                                />
                            )}
                        </div>
                    </div>

                    {/* Right side: Content */}
                    <div className="w-full md:w-1/2 space-y-8">
                        <h2 className="text-[32px] md:text-[48px] font-cal text-black leading-tight">
                            {data.title}
                        </h2>

                        <div className="space-y-6 text-black text-[16px] font-sans leading-relaxed">
                            <p className="font-normal">
                                {data.description1}
                            </p>
                            <p className="font-bold text-black">
                                {data.description2}
                            </p>
                        </div>

                        {data.linkUrl && (
                            <Link
                                href={data.linkUrl}
                                className="inline-flex items-center gap-2 text-[#D02030] font-cal text-[12px]  tracking-wider hover:gap-3 transition-all"
                            >
                                {data.linkText}
                                <ArrowIcon color="#D02030" className="mt-0.5" />
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
