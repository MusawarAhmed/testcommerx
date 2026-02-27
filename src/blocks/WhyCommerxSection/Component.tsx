import React from 'react'
import type { WhyCommerxSectionBlock } from '@/payload-types'

export const WhyCommerxSectionComponent: React.FC<WhyCommerxSectionBlock> = (props) => {
  const { heading, description, items } = props
  console.log('items', items)
  return (
    <section className="bg-black px-[120px] overflow-hidden relative py-[144px]">
      <div className="site-containers mx-auto text-center relative z-10">
        <h2 className="text-white text-[40px] md:text-[70px] font-bold leading-[1.1] mb-8">
          {heading || 'Why Commerx?'}
        </h2>

        {description && (
          <p className="text-[#FFFFFF] text-[18px] md:text-[20px] leading-relaxed mb-14 max-w-4xl mx-auto">
            {description}
          </p>
        )}

        {items && items.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="px-8 py-3.5 cursor-pointer border border-[#FFFFFF] rounded-full text-white text-[14px] md:text-[16px] font-semibold"
              >
                {item.text}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
