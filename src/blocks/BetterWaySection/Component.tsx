import React from 'react'
import Image from 'next/image'
import { Media } from '@/components/Media'
import type { BetterWaySectionBlock } from '@/payload-types'
import { CheckIcon } from '../../app/(frontend)/_components/layout/Icons'

type Props = BetterWaySectionBlock

export const BetterWaySectionComponent: React.FC<Props> = (props) => {
  const { heading, backgroundImage, items, showBackgroundPatterns } = props

  return (
    <section className="py-20 bg-[#000000] relative overflow-hidden">
      {/* Background Patterns */}
      {showBackgroundPatterns && (
        <>
          {/* Top Background Pattern */}
          <div className="absolute -top-20 -left-60 w-[800px] h-[900px] z-0 pointer-events-none opacity-40">
            <Image
              src="/better-way-bg.svg"
              alt="Background Pattern"
              fill
              className="object-contain object-top-left"
            />
          </div>

          {/* Bottom Background Pattern */}
          <div className="absolute -bottom-40 -right-60 w-[800px] h-[900px] z-0 pointer-events-none opacity-40 rotate-180">
            <Image
              src="/better-way-bg.svg"
              alt="Background Pattern"
              fill
              className="object-contain"
            />
          </div>
        </>
      )}

      {/* Legacy Background Image if provided manually */}
      {backgroundImage && typeof backgroundImage !== 'string' && (
        <div className="absolute inset-0 opacity-20 pointer-events-none">
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
              className="bg-white rounded-2xl p-8 md:p-10 flex flex-col h-full hover:shadow-lg transition-all duration-300 border border-gray-100 group"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="mt-1 shrink-0 w-6 h-6 rounded-md bg-red-50 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                  <CheckIcon className="w-4 h-4" color="currentColor" />
                </div>
                <h3 className="text-[18px] md:text-[24px] font-bold font-sans text-black">
                  {item.title}
                </h3>
              </div>
              <p className="text-[14px] md:text-[16px] text-[#444444] font-sans leading-relaxed pl-10">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
