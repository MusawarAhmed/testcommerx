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
  items?: WhatWeDoItem[]
}

export const WhatWeDoSectionComponent: React.FC<Props> = (props) => {
  const { heading, items } = props

  return (
    <section className="py-20 bg-white">
      <div className="site-containers">
        <div className="text-center mb-16">
          <h2 className="text-[32px] md:text-[48px] font-cal text-black leading-tight">
            {heading || 'What We Do'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items?.map((item, index) => (
            <div
              key={item.id || index}
              className="bg-[#F3F6FD] rounded-[16px] p-8 md:p-10 flex flex-col items-start text-left h-full hover:shadow-md transition-shadow duration-300 group"
            >
              {/* Icon */}
              {item.icon && (
                <div className="w-[56px] h-[56px] mb-6 relative shrink-0">
                  <Media resource={item.icon} fill imgClassName="object-contain" />
                </div>
              )}

              <h3 className="text-[18px] md:text-[20px] font-bold font-sans text-black mb-4">
                {item.title}
              </h3>
              <p className="text-[14px] md:text-[16px] text-[#555555] font-sans leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
