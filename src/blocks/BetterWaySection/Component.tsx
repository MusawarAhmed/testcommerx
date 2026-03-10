import React from 'react'
import Image from 'next/image'
import type { BetterWaySectionBlock } from '@/payload-types'

type Props = BetterWaySectionBlock

export const BetterWaySectionComponent: React.FC<Props> = (props) => {
  const { heading, items } = props

  return (
    <section className="py-35 bg-[#000000] relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
        <Image
          src="/better-way-bg.png"
          alt="Section Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="site-containers relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-[32px] md:text-[60px] font-cal text-white leading-tight">
            {heading || 'A Better Way With Commerx'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items?.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="bg-white rounded-2xl p-8 md:p-10 flex flex-col h-full hover:shadow-lg transition-all duration-300 border border-gray-100 group"
            >
              <div className="flex items-start gap-4 mb-4">
                <h3 className="text-[18px] md:text-[24px] font-bold font-sans text-black">
                  {item.title}
                </h3>
              </div>
              <p className="text-[14px] md:text-[16px] text-[#000000] font-sans leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
