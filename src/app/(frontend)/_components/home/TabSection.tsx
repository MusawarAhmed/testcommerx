"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowIcon } from '../layout/Icons';
import { TabSectionBlock, Media, TabItem } from '../../_lib/api';

interface LegacyCapability {
    id: string;
    tabLabel: string;
    title: string;
    titleAccent?: string;
    tags: string[];
    descriptionHeading: string;
    description: string;
    image: string;
}

interface TabSectionProps {
    data?: TabSectionBlock;
    legacyCapabilities?: LegacyCapability[];
}

interface NormalizedTab {
    id: string;
    tabLabel: string;
    mainTitle: string;
    titleAccent?: string;
    tags: string[];
    innerTitle: string;
    innerDescription: string;
    image: Media | string;
    linkText: string;
    linkUrl: string;
}

export default function TabSection({ data, legacyCapabilities }: TabSectionProps) {
    const [activeTab, setActiveTab] = useState(0);

    // If no data and no legacy, return null
    if (!data && (!legacyCapabilities || legacyCapabilities.length === 0)) {
        return null;
    }

    const sectionTitle = data?.title || "Integrated Capabilities. One Strategic Partner.";
    const sectionDesc = data?.description || "Our expertise spans every layer of your enterprise - seamlessly connected to deliver intelligence, performance, and profitability.";

    // Normalize data
    let tabs: NormalizedTab[] = [];

    if (data && data.tabs) {
        tabs = data.tabs.map((t: TabItem) => ({
            id: t.id,
            tabLabel: t.tabLabel,
            // API has 'contentTitle'
            mainTitle: t.contentTitle,
            titleAccent: undefined, // API data doesn't seem to have accent split, but we can add logic if needed
            // API tags are objects {text, id}
            tags: t.tags.map(tag => tag.text),
            innerTitle: t.innerTitle,
            innerDescription: t.innerDescription,
            image: t.image,
            linkText: t.linkText || "Learn More",
            linkUrl: t.linkUrl || `/services/${t.id}`
        }));
    } else if (legacyCapabilities) {
        tabs = legacyCapabilities.map((c: LegacyCapability) => ({
            id: c.id,
            tabLabel: c.tabLabel,
            mainTitle: c.title,
            titleAccent: c.titleAccent,
            tags: c.tags,
            innerTitle: c.descriptionHeading,
            innerDescription: c.description,
            image: c.image,
            linkText: "Learn More",
            linkUrl: `/services/${c.id}`
        }));
    }

    if (tabs.length === 0) return null;

    // Helper to get image URL
    const getImageUrl = (image: Media | string | null | undefined) => {
        if (!image) return '';
        if (typeof image === 'string') return image;
        
        const url = image.url;
        if (url.startsWith('http')) return url;
        
        const serverUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || process.env.NEXT_PUBLIC_SERVER_URL || '';
        return `${serverUrl}${url}`;
    };

    const currentTab = tabs[activeTab];

    return (
        <section className="py-20 bg-[#F3F6FD]">
            <div className="site-containers flex flex-col gap-14">
                {/* Header */}
                <div className="text-center space-y-4">
                    <h2 className="text-[28px] md:text-[48px] font-cal leading-tight text-black">
                        {sectionTitle}
                    </h2>
                    <p className="max-w-5xl mx-auto text-[#000000] font-sans text-[16px]">
                        {sectionDesc}
                    </p>
                </div>

                {/* Tabs Navigation */}
                <div className="bg-white rounded-[8px] shadow-sm py-2 px-3 w-full overflow-x-auto">
                    <div className="flex flex-nowrap md:flex-row justify-between items-center min-w-max md:min-w-0">
                        {tabs.map((cap, index) => (
                            <button
                                key={cap.id || index}
                                onClick={() => setActiveTab(index)}
                                className={`px-4 md:px-6 py-3 text-[16px] md:text-[24px] font-cal rounded-[34px] transition-all duration-300 flex-1 text-center whitespace-nowrap cursor-pointer ${activeTab === index
                                    ? 'bg-[#D02030] text-white shadow-md '
                                    : 'text-[#7D7D7D] hover:text-[#7D7D7D] hover:bg-black/5 '
                                    }`}
                            >
                                {cap.tabLabel}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content Card */}
                <div className="bg-white rounded-[16px] p-6 md:p-12 shadow-xl border border-black/5 animate-fade-in">
                    <div className="space-y-12">
                        {/* Content Title & Tags */}
                        <div className="space-y-6">
                            <h3 className="text-[32px] md:text-[56px] font-cal text-black">
                                {currentTab.mainTitle}
                                {currentTab.titleAccent && <span className="text-[#D02030]"> {currentTab.titleAccent}</span>}
                            </h3>

                            <div className="flex flex-wrap gap-2 text-[14px] md:text-[16px] font-sans font-medium">
                                {currentTab.tags.map((tag, i) => (
                                    <span key={i} className="px-4 py-1.5 rounded-full border border-[#D02030] text-black hover:border-[#D02030] transition-colors">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Content Split: Image & Text Area */}
                        <div className="flex flex-col lg:flex-row gap-8 items-stretch pt-4">
                            {/* Image Part */}
                            <div className="w-full lg:w-1/2">
                                <div className="relative aspect-4/3 w-full bg-[#F3F6FD] p-4 rounded-[8px] overflow-hidden shadow-sm h-full min-h-[300px]">
                                    <div className="relative w-full h-full">
                                        {/* Handle Image URL */}
                                        {(() => {
                                            const imgUrl = getImageUrl(currentTab.image);
                                            if (imgUrl) {
                                                return (
                                                    <Image
                                                        src={imgUrl}
                                                        alt={currentTab.mainTitle || 'Capability Image'}
                                                        fill
                                                        className="object-cover rounded-[4px] transition-opacity duration-500"
                                                        unoptimized
                                                    />
                                                )
                                            }
                                            return null;
                                        })()}
                                    </div>
                                </div>
                            </div>

                            {/* Content Part with #F3F6FD background */}
                            <div className="w-full lg:w-1/2 bg-[#F3F6FD] rounded-[8px] p-4 md:p-6 flex flex-col justify-between">
                                <div className="space-y-6">
                                    <h4 className="text-[20px] md:text-[24px] font-bold font-sans text-black leading-snug">
                                        {currentTab.innerTitle}
                                    </h4>
                                    <p className="text-[16px] text-[#000000] font-sans leading-relaxed">
                                        {currentTab.innerDescription}
                                    </p>
                                </div>

                                <Link
                                    href={currentTab.linkUrl}
                                    className="inline-flex items-center gap-2 text-[#D02030] font-cal text-[16px] tracking-wide hover:gap-3 transition-all pt-8"
                                >
                                    {currentTab.linkText}
                                    <ArrowIcon color="#D02030" className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.5s ease-out forwards;
                }
            `}</style>
        </section>
    );
}
