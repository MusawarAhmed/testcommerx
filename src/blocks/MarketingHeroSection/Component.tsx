import React from 'react'
import Image from 'next/image'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'

import Link from 'next/link'
import { ArrowIcon } from '@/app/(frontend)/_components/layout/Icons'

type AddressLine = {
  id?: string | null
  line?: string | null
}

type Location = {
  id?: string | null
  flag?: string | null
  city: string
  addressLines?: AddressLine[] | null
}

type Props = {
  badge?: string | null
  heading: string
  description?: string | null
  buttonText?: string | null
  buttonLink?: string | null
  heroImage: MediaType | string | null
  locations?: Location[] | null
  showBackgroundPatterns?: boolean | null
}

export const MarketingHeroSectionComponent: React.FC<Props> = (props) => {
  const {
    badge,
    heading,
    description,
    buttonText,
    buttonLink,
    heroImage,
    locations,
    showBackgroundPatterns,
  } = props

  return (
    <section className="pt-32 pb-10 relative">
      {showBackgroundPatterns && (
        <>
          {/* Top Background Pattern */}
          <div className="absolute -top-25 -left-125 w-[800px] h-[900px] z-0 pointer-events-none ">
            <Image
              src="/home-insight-sec-bg.svg"
              alt="Background Pattern"
              fill
              className="object-contain object-top-left"
            />
          </div>

          {/* Bottom Background Pattern */}
          <div className="absolute top-[35%] -right-116 w-[800px] h-[900px] z-0 pointer-events-none rotate-180">
            <Image
              src="/home-insight-sec-bg.svg"
              alt="Background Pattern"
              fill
              className="object-contain"
            />
          </div>
        </>
      )}

      <div className="site-containers relative z-10 text-center space-y-4 mb-16">
        {badge && (
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#FFEAEB] text-[#D02030] text-[12px] font-bold tracking-wider uppercase mb-4">
            {badge}
          </span>
        )}
        <h1 className="text-[48px] md:text-[64px] font-cal text-black leading-tight">{heading}</h1>
        {description && (
          <p className="text-[16px] font-sans text-gray-600 mx-auto max-w-3xl">{description}</p>
        )}
        {(buttonText || buttonLink) && (
          <div className="flex justify-center pt-4">
            <Link
              href={buttonLink || '/contact'}
              className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-10 py-3.5 rounded-sm text-[16px] font-cal font-normal flex items-center gap-2 transition-all group"
            >
              {buttonText || 'Request a Consultation'}
              <ArrowIcon
                color="#ffffff"
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        )}
      </div>

      {/* Hero Image / Map Section - Matches Static Sizing Exactly */}
      {heroImage && (
        <div className="site-containers relative w-full h-[300px] md:h-[600px] mb-20 z-10 px-[120px]">
          <div className="relative w-full h-full z-0">
            <Media resource={heroImage} fill imgClassName="object-contain object-center" priority />
          </div>
        </div>
      )}

      {/* Mobile Locations */}
      {locations && locations.length > 0 && (
        <div className="site-containers relative z-10 grid grid-cols-1 md:hidden gap-6 mb-12">
          {locations.map((location, index) => (
            <div
              key={location.id || index}
              className="bg-white p-6 rounded-lg shadow-lg border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-3">
                {location.flag && <span className="text-2xl">{location.flag}</span>}
                <h3 className="text-[18px] font-bold font-cal text-black">{location.city}</h3>
              </div>
              {location.addressLines && location.addressLines.length > 0 && (
                <div className="space-y-1 font-sans text-[14px] text-gray-600">
                  {location.addressLines.map((addrLine, i) => (
                    <p key={i}>{addrLine.line}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
