import React from 'react'
import { Media } from '@/components/Media'
import type { GlobalPresenceSectionBlock } from '@/payload-types'

export const GlobalPresenceSectionComponent: React.FC<GlobalPresenceSectionBlock> = (props) => {
  const { heading, subtext, mapImage, locations } = props

  return (
    <section className="pt-32 pb-10 relative z-10 bg-white overflow-hidden">
      <div className="site-containers">
        <div className="text-center space-y-4 mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#FFEAEB] text-[#D02030] text-[12px] font-bold tracking-wider uppercase mb-4">
            Contact
          </span>
          {heading && <h1 className="text-[48px] md:text-[64px] font-cal text-black leading-tight">{heading}</h1>}
          {subtext && <p className="text-[16px] font-sans text-gray-600 max-w-2xl mx-auto">{subtext}</p>}
        </div>

        <div className="relative w-full aspect-video md:aspect-[21/9] h-[300px] md:h-[600px] max-w-6xl mx-auto mb-20 z-0 text-center">
            {mapImage && typeof mapImage !== 'string' && (
              <Media resource={mapImage} imgClassName="object-contain w-full h-full object-center" fill />
            )}
            
            {/* We can statically place the first two items for Calgary/Phoenix as placeholders if needed, 
                or just let the mobile stack display them below. We'll use the mobile stack approach for all 
                provided locations so they are always visible without complicated responsive absolute positioning. */}
        </div>
        
        {locations && locations.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12 justify-center">
            {locations.map((loc, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 z-10">
                <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{loc.countryFlag}</span>
                    <h3 className="text-[18px] font-bold font-cal text-black">{loc.city}</h3>
                </div>
                <div className="space-y-1 font-sans text-[14px] text-gray-600 whitespace-pre-wrap">
                    {loc.address}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
