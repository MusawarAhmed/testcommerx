import React from 'react'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import type { StorySectionBlock } from '@/payload-types'

export const StorySectionComponent: React.FC<StorySectionBlock> = (props) => {
  const { heading, content, image } = props

  return (
    <section className="py-20 bg-white">
      <div className="site-containers">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7">
            {heading && (
              <h2 className="text-[32px] md:text-[48px] font-cal text-black mb-6">{heading}</h2>
            )}
            <div className="prose max-w-none text-black text-[16px]">
              {content && <RichText data={content} enableGutter={false} enableProse={false} />}
            </div>
          </div>
          <div className="md:col-span-5">
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
