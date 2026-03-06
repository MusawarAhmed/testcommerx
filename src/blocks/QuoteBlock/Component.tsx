import React from 'react'
import Image from 'next/image'
import type { Media } from '@/payload-types'

// Local type until payload-types.ts is regenerated
export type QuoteBlockProps = {
  blockType: 'quoteBlock'
  quote: string
  authorFirstName: string
  authorLastName: string
  authorPicture?: Media | number | null
  id?: string | null
  className?: string
}

export const QuoteBlockComponent: React.FC<QuoteBlockProps> = ({
  quote,
  authorFirstName,
  authorLastName,
  authorPicture,
}) => {
  const fullName = `${authorFirstName} ${authorLastName}`.trim()

  // Resolve picture URL — authorPicture can be a Media object or a numeric ID
  let pictureUrl: string | undefined
  if (authorPicture && typeof authorPicture === 'object') {
    pictureUrl = (authorPicture as Media).url ?? undefined
  }

  return (
    <div className="my-12 border-l-3 border-[#D02030] pl-8 py-2">
      {/* Quote text */}
      <p className="text-[20px] md:text-[24px] font-normal text-black leading-relaxed mb-8">
        {quote}
      </p>

      {/* Author info */}
      <div className="flex items-center gap-4">
        <div className="relative w-20 h-20 rounded-[8px] overflow-hidden bg-[#EAE9F0] shrink-0">
          {pictureUrl ? (
            <Image src={pictureUrl} alt={fullName} fill className="object-cover w-20 h-20 !m-0" />
          ) : (
            <div className="w-20 h-20 flex items-center justify-center !m-0 text-[#D02030] bg-[#FFEAEB] font-bold text-lg">
              {authorFirstName?.charAt(0) ?? '?'}
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-[16px] text-black !m-0 leading-tight">
            <span className="font-normal">{authorFirstName} </span>
            <span className="text-[24px]">{authorLastName}</span>
          </p>
          <p className="text-[12px] text-black !m-0">Author</p>
        </div>
      </div>
    </div>
  )
}
