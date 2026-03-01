import React from 'react'
import { Media } from '@/components/Media'
import type { ServicePillarsSectionBlock } from '@/payload-types'

export const ServicePillarsSectionComponent: React.FC<ServicePillarsSectionBlock> = (props) => {
  const { heading, introText, pillars } = props

  return (
    <section className="py-20 bg-gray-50">
      <div className="site-containers">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          {heading && <h2 className="text-[32px] md:text-[48px] font-bold text-black mb-6">{heading}</h2>}
          {introText && <p className="text-lg text-gray-700">{introText}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars?.map((pillar, index) => {
            const isHighlighted = pillar.isHighlighted
            const cardBg = isHighlighted ? 'bg-red-600 text-white' : 'bg-white text-black border border-gray-200'
            const titleColor = isHighlighted ? 'text-white' : 'text-black'
            const descColor = isHighlighted ? 'text-pink-100' : 'text-gray-600'
            
            return (
              <div 
                key={index} 
                className={`rounded-2xl p-8 shadow-sm transition-transform hover:-translate-y-1 ${cardBg}`}
              >
                {pillar.icon && typeof pillar.icon !== 'string' && (
                  <div className={`w-14 h-14 rounded-lg flex items-center justify-center mb-6 
                    ${isHighlighted ? 'bg-white/20' : 'bg-red-50'}`}>
                    <Media resource={pillar.icon} imgClassName="object-contain w-8 h-8" />
                  </div>
                )}
                <h3 className={`text-xl font-bold mb-4 ${titleColor}`}>{pillar.title}</h3>
                <p className={`text-base leading-relaxed ${descColor}`}>{pillar.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
