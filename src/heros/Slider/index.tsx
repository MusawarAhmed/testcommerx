'use client'
import React from 'react'

import type { Page } from '@/payload-types'

import { Media } from '@/components/Media'

export const SliderHero: React.FC<Page['hero']> = ({ heroSlides }) => {
  return (
    <div className="relative w-full overflow-hidden min-h-[80vh] flex items-center justify-center bg-black text-white">
      <div className="container relative z-10 py-20">
        <h2 className="text-4xl font-bold mb-8 text-center">Slider Hero (Coming Soon)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {heroSlides?.map((slide, index) => (
            <div key={slide.id || `slide-${index}`} className="border border-white/20 p-6 rounded-lg">
              <p className="text-sm uppercase tracking-wider text-white/60 mb-2">{slide.subtitle}</p>
              <h3 className="text-2xl font-semibold mb-4">{slide.title}</h3>
              <p className="text-sm font-medium">Tab: {slide.tabLabel}</p>
              {slide.image && typeof slide.image === 'object' && (
                <div className="mt-4 relative aspect-video">
                   <Media resource={slide.image} fill className="object-cover rounded" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
