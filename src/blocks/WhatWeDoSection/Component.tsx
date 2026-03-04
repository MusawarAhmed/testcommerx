import React from 'react'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'

type WhatWeDoItem = {
  icon: MediaType | string | null
  title: string
  description: string
  id?: string
}

type Props = {
  heading?: string
  description?: string
  items?: WhatWeDoItem[]
}

export const WhatWeDoSectionComponent: React.FC<Props> = (props) => {
  const { heading, description, items } = props

  return (
    <section className="py-32 bg-[#F3F6FD]">
      <div className="site-containers">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-left py-[45px]">
            <h2 className="text-[32px] md:text-[48px] font-cal text-black leading-tight mb-4">
              {heading || 'What We Do'}
            </h2>
            {description && (
              <p className="text-[20px] font-medium text-[#555555] leading-relaxed">
                {description}
              </p>
            )}
          </div>
          {items?.map((item, index) => (
            <div
              key={item.id || index}
              className={`rounded-2xl p-8 md:p-10 flex flex-col items-start text-left h-full hover:shadow-md transition-shadow duration-300 group ${
                index === 0 ? 'bg-[#D02030] text-white' : 'bg-[#FFFFFF] text-black'
              }`}
            >
              {/* Icon */}
              {item.icon && (
                <div className="w-[56px] h-[56px] mb-6 relative shrink-0">
                  <Media resource={item.icon} fill imgClassName="object-contain" />
                </div>
              )}

              <h3
                className={`text-[18px] md:text-[24px] font-bold font-sans mb-4 ${
                  index === 0 ? 'text-white' : 'text-black'
                }`}
              >
                {item.title}
              </h3>
              <p
                className={`text-[12px] md:text-[14px] font-sans leading-relaxed ${
                  index === 0 ? 'text-white' : 'text-[#555555]'
                }`}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
