import React from 'react'
import Image from 'next/image'
import type { HelpSectionBlock } from '@/payload-types'

export const HelpSectionComponent: React.FC<HelpSectionBlock> = (props) => {
  const { heading, items } = props

  return (
    <section className="py-30 bg-white relative overflow-hidden">
      <div className="absolute -right-[450px] -top-40 w-[1150px] h-[1200px] pointer-events-none">
        <Image src="/pathway-bg.png" alt="Background Pattern" fill className="object-contain" />
      </div>
      <div className="site-containers relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-[32px] md:text-[48px] font-cal text-[#D02030] leading-tight">
            {heading || 'How We Can Help'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items?.map((item, index) => (
            <div
              key={item.id || index}
              className="bg-[#F3F6FD] rounded-2xl p-8 md:p-10 flex flex-col items-center text-center h-full"
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
