import React from 'react'
import Image from 'next/image'
import { Media } from '@/components/Media'
import type { ProcessCircleSectionBlock } from '@/payload-types'

export const ProcessCircleSectionComponent: React.FC<ProcessCircleSectionBlock> = (props) => {
  const { heading, steps, centerImage, showBackgroundPatterns } = props

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {showBackgroundPatterns && (
        <div className="absolute top-0 -right-116 w-[800px] h-[900px] z-0 pointer-events-none rotate-180 opacity-60">
          <Image
            src="/home-insight-sec-bg.svg"
            alt="Background Pattern"
            fill
            className="object-contain"
          />
        </div>
      )}
      <div className="site-containers relative z-10">
        {heading && (
          <h2 className="text-center text-[32px] md:text-[48px] font-bold mb-20">
            <span className="text-black">
              {heading
                .split(' ')
                .slice(0, heading.split(' ').length - 1)
                .join(' ')}{' '}
            </span>
            <span className="text-red-600">{heading.split(' ').slice(-1)[0]}</span>
          </h2>
        )}

        <div className="relative mx-auto max-w-6xl aspect-square hidden md:block">
          {/* Center Image with Circles & Arrows (uploaded from admin) */}
          {centerImage && typeof centerImage !== 'string' && (
            <div
              className="absolute inset-1/10 flex items-center justify-center"
              style={{ pointerEvents: 'none' }}
            >
              <Media resource={centerImage} imgClassName="object-contain w-full h-full" />
            </div>
          )}

          <div className="grid grid-cols-2 gap-8 w-full h-full relative z-10">
            {/* TOP LEFT */}
            {steps?.[0] && (
              <div
                key={`${steps[0].id}-0`}
                className="flex items-start justify-start text-right pt-8 pr-8"
              >
                <div className="w-24 h-24 flex items-start justify-center mb-4">
                  {steps[0].icon && typeof steps[0].icon !== 'string' && (
                    <Media resource={steps[0].icon} imgClassName="object-contain w-12 h-12" />
                  )}
                </div>
                <div className="flex flex-col items-start text-left justify-start">
                  <h3 className="text-lg font-bold text-black">{steps[0].title}</h3>
                  {steps[0].description && (
                    <p className="text-black text-sm max-w-xs leading-relaxed">
                      {steps[0].description}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* TOP RIGHT */}
            {steps?.[1] && (
              <div
                key={`${steps[1].id}-1`}
                className="flex items-start justify-end text-left pt-8 pl-8"
              >
                <div className="flex flex-col items-end text-right justify-start">
                  <h3 className="text-lg font-bold text-black text-right">{steps[1].title}</h3>
                  {steps[1].description && (
                    <p className="text-black text-sm max-w-xs leading-relaxed">
                      {steps[1].description}
                    </p>
                  )}
                </div>
                <div className="w-24 h-24 flex items-start justify-center mb-4">
                  {steps[1].icon && typeof steps[1].icon !== 'string' && (
                    <Media resource={steps[1].icon} imgClassName="object-contain w-12 h-12" />
                  )}
                </div>
              </div>
            )}

            {/* BOTTOM LEFT */}
            {steps?.[2] && (
              <div
                key={`${steps[2].id}-2`}
                className="flex items-end justify-start text-right pb-8 pr-8"
              >
                <div className="w-24 h-24 flex items-start justify-center mb-4">
                  {steps[2].icon && typeof steps[2].icon !== 'string' && (
                    <Media resource={steps[2].icon} imgClassName="object-contain w-12 h-12" />
                  )}
                </div>
                <div className="flex flex-col items-start text-left justify-start">
                  <h3 className="text-lg font-bold text-black">{steps[2].title}</h3>
                  {steps[2].description && (
                    <p className="text-black text-sm max-w-xs leading-relaxed">
                      {steps[2].description}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* BOTTOM RIGHT */}
            {steps?.[3] && (
              <div
                key={`${steps[3].id}-3`}
                className="flex items-end justify-end text-left pb-8 pl-8"
              >
                <div className="flex flex-col items-end text-right justify-start">
                  <h3 className="text-lg font-bold text-black text-right">{steps[3].title}</h3>
                  {steps[3].description && (
                    <p className="text-black text-sm max-w-xs leading-relaxed">
                      {steps[3].description}
                    </p>
                  )}
                </div>
                <div className="w-24 h-24 flex items-start justify-center mb-4">
                  {steps[3].icon && typeof steps[3].icon !== 'string' && (
                    <Media resource={steps[3].icon} imgClassName="object-contain w-12 h-12" />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="grid grid-cols-1 gap-8 md:hidden">
          {steps?.map((step, index) => (
            <div key={`${step.id}-${index}`} className="flex flex-col items-center text-center">
              <div className="w-20 h-20 flex items-center justify-center mb-4">
                {step.icon && typeof step.icon !== 'string' && (
                  <Media resource={step.icon} imgClassName="object-contain w-10 h-10" />
                )}
              </div>
              <h3 className="text-lg font-bold text-black mb-3 max-w-xs">{step.title}</h3>
              {step.description && (
                <p className="text-black text-sm max-w-xs leading-relaxed">{step.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
