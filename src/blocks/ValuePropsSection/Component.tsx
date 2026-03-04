import React from 'react'
import type { ValuePropsSectionBlock } from '@/payload-types'

export const ValuePropsSectionComponent: React.FC<ValuePropsSectionBlock> = (props) => {
  const { heading, cards } = props

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background patterned overlay placeholder */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at center, #333 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="site-containers relative z-10">
        {heading && (
          <h2 className="text-center text-[32px] md:text-[48px] font-bold text-white mb-16">
            {heading}
          </h2>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {cards?.map((card, index) => (
            <div
              key={`${card.id}-${index}`}
              className="bg-white rounded-xl p-10 transition-transform hover:-translate-y-1 shadow-lg"
            >
              <h3 className="text-xl font-bold text-black mb-4">{card.title}</h3>
              {card.description && <p className="text-gray-600">{card.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
