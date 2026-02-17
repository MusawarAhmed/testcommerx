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

const ArrowIcon = ({ color = '#D02030', className = '' }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M1 6H11" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 1L11 6L6 11" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const TabSectionComponent: React.FC<Props> = ({ title, description, tabs = [] }) => {
  const [activeTab, setActiveTab] = useState(0)

  if (tabs.length === 0) return null

  const currentTab = tabs[activeTab]

  return (
    <section className="py-20 bg-[#F3F6FD]">
      <div className="container flex flex-col gap-14">
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-[28px] md:text-[48px] font-bold leading-tight text-black">
            {title || 'Integrated Capabilities. One Strategic Partner.'}
          </h2>
          <p className="max-w-5xl mx-auto text-[#000000] text-[16px]">
            {description ||
              'Our expertise spans every layer of your enterprise - seamlessly connected to deliver intelligence, performance, and profitability.'}
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-[8px] shadow-sm py-2 px-3 w-full overflow-x-auto">
          <div className="flex flex-nowrap md:flex-row justify-between items-center min-w-max md:min-w-0">
            {tabs.map((tab, index) => (
              <button
                key={tab.id || index}
                onClick={() => setActiveTab(index)}
                className={`px-4 md:px-6 py-3 text-[16px] md:text-[24px] font-bold rounded-[34px] transition-all duration-300 flex-1 text-center whitespace-nowrap cursor-pointer ${
                  activeTab === index
                    ? 'bg-[#D02030] text-white shadow-md '
                    : 'text-[#7D7D7D] hover:text-[#7D7D7D] hover:bg-black/5 '
                }`}
              >
                {tab.tabLabel}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Card */}
        <div className="bg-white rounded-[16px] p-6 md:p-12 shadow-xl border border-black/5 animate-fade-in">
          <div className="space-y-12">
            {/* Content Title & Tags */}
            <div className="space-y-6">
              {currentTab.contentTitle && (
                <h3 className="text-[32px] md:text-[56px] font-bold text-black">
                  {currentTab.contentTitle}
                </h3>
              )}

              {currentTab.tags && currentTab.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 text-[14px] md:text-[16px] font-medium">
                  {currentTab.tags.map((tag, i) => (
                    <span
                      key={tag.id || i}
                      className="px-4 py-1.5 rounded-full border border-[#D02030] text-black hover:border-[#D02030] transition-colors"
                    >
                      {tag.text}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Content Split: Image & Text Area */}
            <div className="flex flex-col lg:flex-row gap-8 items-stretch pt-4">
              {/* Image Part */}
              <div className="w-full lg:w-1/2">
                <div className="relative aspect-4/3 w-full bg-[#F3F6FD] p-4 rounded-[8px] overflow-hidden shadow-sm h-full min-h-[300px]">
                  <div className="relative w-full h-full">
                    {currentTab.image && (
                      <Media
                        resource={currentTab.image}
                        fill
                        className="object-cover rounded-[4px] transition-opacity duration-500"
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Content Part with #F3F6FD background */}
              <div className="w-full lg:w-1/2 bg-[#F3F6FD] rounded-[8px] p-4 md:p-6 flex flex-col justify-between">
                <div className="space-y-6">
                  {currentTab.innerTitle && (
                    <h4 className="text-[20px] md:text-[24px] font-bold text-black leading-snug">
                      {currentTab.innerTitle}
                    </h4>
                  )}
                  {currentTab.innerDescription && (
                    <p className="text-[16px] text-[#000000] leading-relaxed">
                      {currentTab.innerDescription}
                    </p>
                  )}
                </div>

                {currentTab.linkUrl && (
                  <Link
                    href={currentTab.linkUrl}
                    className="inline-flex items-center gap-2 text-[#D02030] font-bold text-[16px] tracking-wide hover:gap-3 transition-all pt-8"
                  >
                    {currentTab.linkText || 'Learn More'}
                    <ArrowIcon color="#D02030" className="w-4 h-4" />
                  </Link>
                )}
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
  )
}
