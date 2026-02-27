import React from 'react'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'

type MissionVisionItem = {
  icon: MediaType | string | null
  title: string
  description: string
  id?: string
}

type Props = {
  heading?: string
  items?: MissionVisionItem[]
}

export const MissionVisionSectionComponent: React.FC<Props> = (props) => {
  const { heading, items } = props

  return (
    <section className="py-20 bg-white">
      <div className="site-containers">
        <div className="text-center mb-16">
          <h2 className="text-[32px] md:text-[48px] font-cal text-black leading-tight">
            {(() => {
              const text = heading || 'Our Mission And Vision'
              const words = text.split(' ')
              const lastWord = words.pop()
              return (
                <>
                  {words.join(' ')} <span className="text-[#D02030]">{lastWord}</span>
                </>
              )
            })()}
          </h2>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 max-w-4xl mx-auto">
          {items?.map((item, index) => (
            <div
              key={item.id || index}
              className="flex-1 bg-white border border-gray-100 rounded-[16px] p-8 md:p-10 flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              {/* Icon */}
              {item.icon && (
                <div className="w-[64px] h-[64px] mb-6 relative shrink-0">
                  <Media resource={item.icon} fill imgClassName="object-contain" />
                </div>
              )}

              <h3 className="text-[20px] md:text-[24px] font-bold font-sans text-black mb-4">
                {item.title}
              </h3>
              <p className="text-[14px] md:text-[16px] text-[#555555] font-sans leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
