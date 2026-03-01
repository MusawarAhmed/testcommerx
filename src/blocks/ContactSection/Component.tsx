import React from 'react'
import type { ContactSectionBlock } from '@/payload-types'
import ContactForm from '@/app/(frontend)/_components/common/ContactForm'

export const ContactSectionComponent: React.FC<ContactSectionBlock> = (props) => {
  const { heading, subtext } = props

  return (
    <section className="py-20 relative z-10">
      <div className="site-containers">
        <div className="text-center mb-16 space-y-4">
          {heading && (
            <h2 className="text-[32px] md:text-[48px] font-cal text-black leading-tight">
              {heading}
            </h2>
          )}
          {subtext && (
            <p className="text-[14px] font-sans font-normal leading-none text-[#D02030] tracking-wide capitalize">
              {subtext}
            </p>
          )}
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-[4px] shadow-[0_15px_40px_rgb(0,0,0,0.12)] p-8 md:p-16 border border-gray-100">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
