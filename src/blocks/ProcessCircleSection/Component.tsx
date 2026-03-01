import React from 'react'
import { Media } from '@/components/Media'
import type { ProcessCircleSectionBlock } from '@/payload-types'

export const ProcessCircleSectionComponent: React.FC<ProcessCircleSectionBlock> = (props) => {
  const { heading, steps } = props
  
  // Custom simple layout representation of the circle diagram for React component mapping
  return (
    <section className="py-24 bg-white">
      <div className="site-containers">
        {heading && (
          <h2 className="text-center text-[32px] md:text-[48px] font-bold mb-20">
            <span className="text-black">{heading.split(' ').slice(0, heading.split(' ').length - 1).join(' ')} </span>
            <span className="text-red-600">{heading.split(' ').slice(-1)[0]}</span>
          </h2>
        )}

        <div className="relative max-w-4xl mx-auto flex flex-col items-center">
            {/* Center Logo Placeholder */}
            <div className="hidden md:flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-4 border-red-200 items-center justify-center z-10 bg-white">
                <span className="text-4xl text-red-600 font-bold">C</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full md:gap-x-48 md:gap-y-24 relative z-0">
                {steps?.map((step, index) => (
                    <div key={index} className={`flex flex-col items-center text-center ${index % 2 === 0 ? 'md:items-end md:text-right' : 'md:items-start md:text-left'}`}>
                         <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4 border border-red-100">
                             {step.icon && typeof step.icon !== 'string' && (
                                <Media resource={step.icon} imgClassName="object-contain w-8 h-8" />
                             )}
                         </div>
                         <h3 className="text-lg font-bold text-black mb-2 max-w-[200px]">{step.title}</h3>
                         {step.description && <p className="text-gray-600 max-w-[250px]">{step.description}</p>}
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  )
}
