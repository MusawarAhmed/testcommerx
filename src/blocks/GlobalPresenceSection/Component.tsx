import React from 'react'
import { Media } from '@/components/Media'
import type { GlobalPresenceSectionBlock } from '@/payload-types'

export const GlobalPresenceSectionComponent: React.FC<GlobalPresenceSectionBlock> = (props) => {
  const { heading, subtext, mapImage } = props

  // Split heading to color the second word red
  const headingWords = heading?.split(' ') || []
  const firstWord = headingWords[0]
  const remainingWords = headingWords.slice(1).join(' ')

  return (
    <section className="py-35 bg-white overflow-hidden">
      <div className="site-containers">
        <div className="text-center mb-16">
          {heading && (
            <h2 className="text-[40px] md:text-[56px] font-cal text-black mb-6">
              {firstWord} <span className="text-[#D02030]">{remainingWords}</span>
            </h2>
          )}
          {subtext && (
            <p className="text-[17px] leading-relaxed text-[#4A4A4A] max-w-3xl mx-auto font-sans">
              {subtext}
            </p>
          )}
        </div>

        <div className="relative w-full max-w-6xl mx-auto">
          {/* Map Container */}
          <div className="relative aspect-video md:aspect-[21/9] w-full">
            {mapImage && typeof mapImage !== 'string' ? (
              <Media resource={mapImage} imgClassName="object-contain w-full h-full" fill />
            ) : (
              <div className="w-full h-full bg-gray-50 flex items-center justify-center border border-dashed border-gray-200 rounded-lg text-gray-400 font-sans">
                World Map Visual (Upload image in CMS)
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="mt-12 md:mt-0 md:absolute md:bottom-[-20px] md:left-0 flex items-center gap-8 text-[14px] font-sans text-gray-700">
            <div className="flex items-center gap-2">
              <div className="relative w-4 h-5 flex items-center justify-center">
                <svg
                  width="15"
                  height="20"
                  viewBox="0 0 15 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 7.34337C0 3.26372 3.35938 0 7.5 0C11.6406 0 15 3.26372 15 7.34337C15 11.967 10.3125 17.5231 8.35938 19.6212C7.89062 20.1263 7.10938 20.1263 6.64062 19.6212C4.6875 17.5231 0 11.967 0 7.34337ZM7.5 9.94658C8.86719 9.94658 10 8.81982 10 7.45993C10 6.10005 8.86719 4.97329 7.5 4.97329C6.13281 4.97329 5 6.10005 5 7.45993C5 8.81982 6.13281 9.94658 7.5 9.94658Z"
                    fill="#D02030"
                  />
                </svg>
              </div>
              <span className="font-medium">Our Offices</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#D02030]" />
              <span className="font-medium">Our Clients</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
