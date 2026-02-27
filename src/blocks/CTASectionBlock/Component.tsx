import React from 'react'
import Image from 'next/image'
import type { CTASectionBlock } from '@/payload-types'
import ContactForm from '@/app/(frontend)/_components/common/ContactForm'

export const CTASectionComponent: React.FC<CTASectionBlock> = (props) => {
  const { heading, description } = props

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[#D02030]" />
      <div className="absolute inset-0 z-1">
        <Image
          src="/cta-bg1.png"
          alt="Background Pattern"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      <div className="site-containers relative z-10">
        <div className="text-center mb-12 space-y-6">
          <h2 className="text-[28px] md:text-[48px] font-cal text-white leading-tight">
            {heading || "Let's Build Your Next Competitive Advantage"}
          </h2>
          {description && (
            <p className="text-[16px] font-sans font-normal text-white">{description}</p>
          )}
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-[4px] shadow-2xl p-6 md:p-12">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
