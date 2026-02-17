'use client'
import React, { useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import Link from 'next/link'
import type { Page } from '@/payload-types'
import { Media } from '@/components/Media'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'

const ArrowIcon = ({ color = '#000', className = '' }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M1 6H11" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 1L11 6L6 11" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const SliderHero: React.FC<Page['hero']> = ({ heroSlides }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false)
  const swiperRef = useRef<SwiperType | null>(null)

  if (!heroSlides || !Array.isArray(heroSlides) || heroSlides.length === 0) {
    return null
  }

  const handleTabClick = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideToLoop(index)
      setActiveIndex(index)
      setIsAutoplayPaused(true)
      if (swiperRef.current.autoplay) {
        swiperRef.current.autoplay.stop()
        swiperRef.current.autoplay.pause()
      }
    }
  }

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        loop={true}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="h-full w-full"
      >
        {heroSlides.map((slide, index) => {
          return (
            <SwiperSlide key={slide.id || index}>
              <div className="relative h-full w-full">
                {/* Background Image with Zoom Animation */}
                <div className="absolute inset-0 z-0">
                  {slide.image && (
                    <Media
                      resource={slide.image}
                      fill
                      className={`object-cover transition-transform duration-6000 ease-linear ${activeIndex === index ? 'scale-110' : 'scale-100'
                        }`}
                      priority={index === 0}
                    />
                  )}
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex items-center">
                  <div className="container">
                    <div className="max-w-4xl text-white">
                      <span className="inline-block text-[18px] md:text-[24px] font-normal mb-6 text-white animate-fade-in-up">
                        {slide.subtitle}
                      </span>
                      <h1 className="text-[32px] md:text-[48px] font-normal mb-10 leading-[1.1] md:leading-[1.2] animate-fade-in-up delay-100">
                        {slide.title}
                      </h1>

                      {slide.link && (
                        <Link
                          href={slide.link}
                          className="inline-flex items-center gap-2 text-[16px] border-b border-white/30 pb-1 hover:border-white transition-all group animate-fade-in-up delay-200"
                        >
                          Explore Our Solutions
                          <ArrowIcon color="#ffffff" className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>

      {/* Bottom Tabs Component */}
      <div className="absolute bottom-12 left-0 w-full z-20">
        <div className="container">
          <div className="flex flex-nowrap justify-between items-end border-t border-white/10 pt-8 overflow-x-auto no-scrollbar gap-8 md:gap-0">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.id || index}
                onClick={() => handleTabClick(index)}
                className="relative text-left pb-4 transition-all group flex-none md:flex-1 cursor-pointer"
              >
                <div className="inline-block relative whitespace-nowrap">
                  <span className={`text-[16px] md:text-[24px] font-normal transition-colors ${activeIndex === index ? 'text-white' : 'text-white group-hover:text-white/70'
                    }`}>
                    {slide.tabLabel}
                  </span>
                  {activeIndex === index && (
                    <div className={`absolute -bottom-[17px] md:-bottom-[17px] left-0 h-1 bg-[#D32F2F] ${isAutoplayPaused ? 'animate-width-expand-fast' : 'animate-width-expand-slow'}`} />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        
        @keyframes width-expand {
          from { width: 0; }
          to { width: 100%; }
        }
        .animate-width-expand-slow {
          animation: width-expand 5s linear forwards;
        }
        .animate-width-expand-fast {
          animation: width-expand 0.4s ease-out forwards;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}
