import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowIcon } from '@/app/(frontend)/_components/layout/Icons'
import type { AboutHeroSectionBlock } from '@/payload-types'

export const AboutHeroSectionComponent: React.FC<AboutHeroSectionBlock> = (props) => {
  const { badge, heading, description, primaryButton, secondaryButton, showBackgroundPatterns } =
    props

  return (
    <section className="pt-32 pb-10 relative overflow-hidden bg-white min-h-[60vh] flex flex-col justify-center">
      {showBackgroundPatterns && (
        <>
          {/* Top Background Pattern */}
          <div className="absolute -top-25 -left-125 w-[800px] h-[900px] z-0 pointer-events-none opacity-60">
            <Image
              src="/home-insight-sec-bg.svg"
              alt="Background Pattern"
              fill
              className="object-contain object-top-left"
            />
          </div>

          {/* Bottom Background Pattern */}
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

      <div className="site-containers relative z-10 text-center space-y-4 max-w-6xl mx-auto">
        {badge && (
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#FFEAEB] text-[#D02030] text-[12px] font-bold tracking-wider uppercase mb-4">
            {badge}
          </span>
        )}
        <h1 className="text-[40px] md:text-[64px] font-cal text-black leading-tight max-w-5xl mx-auto">
          {heading}
        </h1>
        {description && (
          <p className="text-[14px] md:text-[16px] font-sans text-[#555555] mx-auto max-w-3xl leading-relaxed">
            {description}
          </p>
        )}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-8">
          {primaryButton?.text && (
            <Link
              href={primaryButton.link || '#'}
              className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-10 py-3.5 rounded-sm text-[16px] font-cal font-normal flex items-center gap-2 transition-all group shadow-sm"
            >
              {primaryButton.text}
              <ArrowIcon
                color="#ffffff"
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          )}

          {secondaryButton?.text && (
            <Link
              href={secondaryButton.link || '#'}
              className="text-black hover:text-[#D32F2F] px-4 py-3.5 text-[16px] font-cal font-normal flex items-center gap-2 transition-all group"
            >
              {secondaryButton.text}
              <ArrowIcon
                color="currentColor"
                className="group-hover:translate-x-1 transition-transform rotate-0"
              />
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
