import React from 'react'
import type { HelpSectionBlock } from '@/payload-types'

export const HelpSectionComponent: React.FC<HelpSectionBlock> = (props) => {
  const { heading, items } = props

  return (
    <section className="py-20 bg-white">
      <div className="site-containers">
        <div className="text-center mb-16">
          <h2 className="text-[32px] md:text-[48px] font-cal text-[#D02030] leading-tight">
            {heading || 'How We Can Help'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items?.map((item, index) => (
            <div
              key={item.id || index}
              className="bg-[#F3F6FD] rounded-[16px] p-8 md:p-10 flex flex-col items-center text-center h-full hover:shadow-md transition-shadow duration-300"
            >
              <h3 className="text-[20px] md:text-[24px] font-bold font-sans text-black mb-6">
                {item.title}
              </h3>
              <p className="text-[16px] text-[#000000] font-sans leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
