import React from 'react'
import Image from 'next/image'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import type { StorySectionBlock } from '@/payload-types'

export const StorySectionComponent: React.FC<StorySectionBlock> = (props) => {
  const { heading, content, image, showBackgroundPatterns } = props

  return (
    <section className="py-[80px] md:py-[144px] bg-white relative overflow-hidden">
      {showBackgroundPatterns && (
        <>
          {/* Background Pattern - Right Side */}
          <div className="absolute top-[35%] -right-116 w-[800px] h-[900px] z-0 pointer-events-none rotate-180 opacity-60">
            <Image
              src="/home-insight-sec-bg.svg"
              alt="Background Pattern"
              fill
              className="object-contain"
            />
          </div>
        </>
      )}
      <div className="site-containers relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-13 gap-12 items-center">
          <div className="md:col-span-6">
            {heading && (
              <h2 className="text-[32px] md:text-[48px] font-cal text-black mb-6">{heading}</h2>
            )}
            <div className="prose max-w-none text-black text-[16px]">
              {content && <RichText data={content} enableGutter={false} enableProse={false} />}
            </div>
          </div>
          <div className="md:col-span-7">
            {image && typeof image !== 'string' && (
              <div className="relative w-[585px] h-[440px] rounded-lg overflow-hidden shadow-lg">
                <Media resource={image} imgClassName="object-cover w-full h-full" fill />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
