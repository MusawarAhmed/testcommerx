import React from 'react'
import { Media } from '@/components/Media'
import type { MissionVisionSectionBlock } from '@/payload-types'

export const MissionVisionSectionComponent: React.FC<MissionVisionSectionBlock> = (props) => {
  const { heading, cards } = props

  return (
    <section className="py-20 bg-white">
      <div className="site-containers">
        {heading && (
          <h2 className="text-center text-[32px] md:text-[48px] font-bold mb-16">
            <span className="text-black">{heading.split(' ')[0]} </span>
            {heading.split(' ').slice(1).join(' ').includes('&') && (
              <span className="text-black">&amp; </span>
            )}
            <span className="text-red-600">
              {heading.split(' ').slice(heading.split(' ').findIndex(w => w === '&') > -1 ? heading.split(' ').findIndex(w => w === '&') + 1 : 1).join(' ')}
            </span>
          </h2>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {cards?.map((card, index) => (
            <div key={index} className="bg-[#F0F4F8] rounded-2xl p-10 text-center flex flex-col items-center">
              {card.icon && typeof card.icon !== 'string' && (
                <div className="w-20 h-20 mb-6 flex items-center justify-center">
                  <Media resource={card.icon} imgClassName="object-contain w-full h-full" />
                </div>
              )}
              <h3 className="text-2xl font-bold text-black mb-4">{card.title}</h3>
              <p className="text-gray-700 text-lg leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
