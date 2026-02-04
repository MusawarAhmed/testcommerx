'use client'
import React, { useState } from 'react'
import type { Media as MediaType } from '@/payload-types'
import { Media } from '@/components/Media'
import Link from 'next/link'

type Tag = {
    text?: string
    id?: string
}

type TabItem = {
    tabLabel: string
    contentTitle?: string
    tags?: Tag[]
    image: MediaType | string | null
    innerTitle?: string
    innerDescription?: string
    linkText?: string
    linkUrl?: string
    id?: string
}

type Props = {
    title?: string
    description?: string
    tabs?: TabItem[]
}

const ArrowIcon = ({ color = "#D02030", className = "" }) => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M1 6H11" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 1L11 6L6 11" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

export const TabSectionComponent: React.FC<Props> = ({
    title,
    description,
    tabs = []
}) => {
    const [activeTabIndex, setActiveTabIndex] = useState(0)

    const activeTab = tabs[activeTabIndex]

    return (
        <section className="py-20 bg-[#f8f9fc]">
            <div className="container mx-auto px-4 md:px-8">
                {/* Section Header */}
                <div className="text-center mb-12 max-w-4xl mx-auto">
                    <h2 className="text-[32px] md:text-[40px] font-bold text-black mb-4 leading-tight">
                        {title}
                    </h2>
                    <p className="text-gray-600 text-lg">
                        {description}
                    </p>
                </div>

                {/* Tabs Navigation */}
                <div className="flex flex-wrap justify-center gap-4 mb-12 border-b border-gray-200 pb-1">
                    {tabs.map((tab, index) => (
                        <button
                            key={tab.id || index}
                            onClick={() => setActiveTabIndex(index)}
                            className={`
                                pb-4 px-4 text-[18px] font-bold transition-all border-b-4
                                ${activeTabIndex === index 
                                    ? 'text-[#D02030] border-[#D02030]' 
                                    : 'text-gray-400 border-transparent hover:text-gray-600'}
                            `}
                        >
                            {tab.tabLabel}
                        </button>
                    ))}
                </div>

                {/* Active Tab Content */}
                {activeTab && (
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm">
                         {/* Content Title with Red Accent */}
                         {activeTab.contentTitle && (
                            <h3 className="text-[32px] md:text-[42px] font-bold text-black mb-6">
                                {activeTab.contentTitle.split(' ').map((word, i, arr) => (
                                    <span key={i} className={i === arr.length - 1 ? 'text-[#D02030]' : ''}>
                                        {word}{' '}
                                    </span>
                                ))}
                            </h3>
                        )}

                        {/* Tags */}
                        {activeTab.tags && activeTab.tags.length > 0 && (
                            <div className="flex flex-wrap gap-3 mb-10">
                                {activeTab.tags.map((tag, i) => (
                                    <span key={tag.id || i} className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 text-sm font-medium bg-white">
                                        {tag.text}
                                    </span>
                                ))}
                            </div>
                        )}

                        <div className="flex flex-col md:flex-row gap-12">
                             {/* Left: Image */}
                             <div className="w-full md:w-1/2">
                                <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden">
                                     {activeTab.image && (
                                        <Media 
                                            resource={activeTab.image}
                                            className="object-cover w-full h-full"
                                            fill
                                        />
                                    )}
                                </div>
                             </div>

                             {/* Right: Inner Content */}
                             <div className="w-full md:w-1/2 flex flex-col justify-center space-y-6">
                                {activeTab.innerTitle && (
                                    <h4 className="text-[24px] md:text-[28px] font-bold text-black leading-tight">
                                        {activeTab.innerTitle}
                                    </h4>
                                )}
                                {activeTab.innerDescription && (
                                    <p className="text-gray-600 text-base leading-relaxed">
                                        {activeTab.innerDescription}
                                    </p>
                                )}
                                
                                {activeTab.linkUrl && (
                                    <Link 
                                        href={activeTab.linkUrl}
                                        className="inline-flex items-center gap-2 text-[#D02030] font-bold tracking-wide hover:gap-3 transition-all"
                                    >
                                        {activeTab.linkText || 'Learn More'}
                                        <ArrowIcon className="mt-0.5" />
                                    </Link>
                                )}
                             </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
