import React from 'react'
import type { Media as MediaType } from '@/payload-types' // Import specific Media type
import { Media } from '@/components/Media' // Use Payload's Media component
import Link from 'next/link'

// Define the Props type based on the config we just made
// In a real app, you'd auto-generate these, but for now we manually match
type Props = {
  title?: string
  description1?: string
  description2?: string
    // In Payload, uploads can be strings (IDs) or objects (Media) depending on depth
  leftImage?: MediaType | string | null
  bgImage?: MediaType | string | null
  linkText?: string
  linkUrl?: string
}

const ArrowIcon = ({ color = "#000", className = "" }) => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M1 6H11" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 1L11 6L6 11" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

export const InsightsSectionComponent: React.FC<Props> = ({ 
    title, 
    description1, 
    description2, 
    leftImage, 
    bgImage,
    linkText,
    linkUrl 
}) => {
    return (
        <section className="relative py-20 bg-[#ffffff] overflow-hidden">
            {/* Background Pattern */}
             {bgImage && (
                <div className="absolute -top-50 -left-125 w-[800px] h-[900px] z-0 pointer-events-none">
                     <Media resource={bgImage} className="object-contain object-top-left w-full h-full" fill />
                </div>
            )}

            <div className="container relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                    {/* Left side: Image */}
                    <div className="w-full md:w-1/2">
                        <div className="relative aspect-[4/3] w-full">
                            {leftImage && (
                                <Media 
                                    resource={leftImage} 
                                    className="object-cover rounded-xl shadow-2xl w-full h-full" 
                                    fill
                                />
                            )}
                        </div>
                    </div>

                    {/* Right side: Content */}
                    <div className="w-full md:w-1/2 space-y-8">
                        <h2 className="text-[32px] md:text-[48px] font-bold text-black leading-tight">
                            {title}
                        </h2>

                        <div className="space-y-6 text-black text-[16px] leading-relaxed">
                            <p className="font-normal">
                                {description1}
                            </p>
                            <p className="font-bold text-black">
                                {description2}
                            </p>
                        </div>

                        {linkUrl && (
                             <Link
                                href={linkUrl}
                                className="inline-flex items-center gap-2 text-[#D02030] text-[12px] font-bold tracking-wider hover:gap-3 transition-all uppercase"
                            >
                                {linkText}
                                <ArrowIcon color="#D02030" className="mt-0.5" />
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
