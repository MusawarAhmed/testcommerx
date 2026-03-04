import React from 'react'
import { Media } from '@/components/Media'
import type { BetterWaySectionBlock } from '@/payload-types'

type Props = BetterWaySectionBlock

export const BetterWaySectionComponent: React.FC<Props> = (props) => {
  const { heading, backgroundImage, items } = props

  return (
    <section className="py-20 bg-[#000000] relative overflow-hidden">
      {/* Background Pattern/Image */}
      {backgroundImage && typeof backgroundImage !== 'string' && (
        <div className="absolute inset-0 opacity-100 pointer-events-none">
          <Media resource={backgroundImage} fill imgClassName="object-cover w-full h-full" />
        </div>
      )}

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
              className="bg-white rounded-2xl p-8 md:p-10 flex flex-col h-full hover:shadow-lg transition-shadow duration-300 border border-gray-100"
            >
              <h3 className="text-[18px] md:text-[24px] font-bold font-sans text-black mb-4">
                {item.title}
              </h3>
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
