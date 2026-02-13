import React from 'react'
import { Media } from '@/components/Media'
import type { CompaniesSectionBlock } from '@/payload-types'

export const CompaniesSectionComponent: React.FC<CompaniesSectionBlock> = (props) => {
  const { title, companies } = props

  return (
    <section className="py-20 bg-white">
      <div className="site-container">
        {title && (
          <h2 className="text-center text-[28px] md:text-[48px] font-cal mb-16">
            <span className="text-black">{title.split(' ')[0]} </span>
            <span className="text-[#D02030]">{title.split(' ').slice(1).join(' ')}</span>
          </h2>
        )}

        <div className="flex flex-wrap items-center justify-center md:justify-between gap-10 md:gap-8">
          {companies?.map((company, index) => {
            if (typeof company.logo === 'string') return null;

            return (
              <div key={index} className="relative w-[180px] h-[60px] transition-all duration-300">
                <Media
                   resource={company.logo}
                   imgClassName="object-contain"
                   fill
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
