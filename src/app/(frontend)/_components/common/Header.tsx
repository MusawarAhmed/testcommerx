'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu, X } from 'lucide-react'
import { ArrowIcon } from '../layout/Icons'

const solutions = [
  { name: 'IT & Technology', href: '/services/it-technology-solutions' },
  { name: 'Telecom', href: '/services/telecom-network-infrastructure' },
  { name: 'GPS Tracking', href: '/services/gps-tracking' },
  { name: 'Marketing', href: '/services/marketing' },
  { name: 'Reputation', href: '/services/reputation-management' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false)
  const pathname = usePathname()

  // Close menus on path name change
  useEffect(() => {
    setIsMenuOpen(false)
    setIsSolutionsOpen(false)
  }, [pathname])

  const isLightPage =
    pathname === '/contact' ||
    pathname?.startsWith('/blog') ||
    pathname?.startsWith('/services') ||
    pathname === '/privacy-policy' ||
    pathname === '/terms-of-service' ||
    pathname === '/marketing' ||
    pathname === '/about-us'

  return (
    <header
      className={`absolute top-0 left-0 w-full z-50 border-b transition-colors duration-300 ${isLightPage ? 'bg-white border-gray-100 text-black' : 'bg-transparent border-white/10 text-white'}`}
    >
      <nav className="site-containers flex items-center justify-between py-5 md:py-6">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={isLightPage ? '/Commerx-Logo-black.svg' : '/Commerx-Logo-Color.svg'}
            alt="COMMERX"
            width={180}
            height={40}
            className="h-7 md:h-10 w-auto"
            priority
          />
        </Link>

        {/* Desktop Menu & CTA */}
        <div className="flex items-center gap-6 lg:gap-10">
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 lg:space-x-10 text-[16px] font-medium">
            <div
              className="relative group"
              onMouseEnter={() => setIsSolutionsOpen(true)}
              onMouseLeave={() => setIsSolutionsOpen(false)}
            >
              <button className="flex items-center gap-1 hover:text-[#D32F2F] transition-colors py-2 cursor-pointer">
                Solutions{' '}
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${isSolutionsOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute top-full -left-4 pt-4 transition-all duration-300 ease-in-out ${isSolutionsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}
              >
                <div className="bg-white border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.1)] rounded-md py-4 min-w-[260px] flex flex-col overflow-hidden">
                  {solutions.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="px-6 py-3.5 text-black hover:bg-gray-50 hover:text-[#D32F2F] transition-all border-l-4 border-transparent hover:border-[#D32F2F] text-[15px] font-medium"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* <Link href="/blog" className="hover:text-[#D32F2F] transition-colors">
              Insights
            </Link> */}
            <Link href="/about-us" className="hover:text-[#D32F2F] transition-colors">
              About
            </Link>
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hidden md:flex bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-5 lg:px-6 py-2.5 rounded-sm text-[15px] lg:text-[16px] font-cal font-normal items-center gap-2 transition-all group"
            >
              Request a Consultation
              <ArrowIcon color="#ffffff" className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <button
              className="md:hidden p-1.5 rounded-md hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? (
                <X className={`w-7 h-7 ${isLightPage ? 'text-black' : 'text-white'}`} />
              ) : (
                <Menu className={`w-7 h-7 ${isLightPage ? 'text-black' : 'text-white'}`} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] md:hidden transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[85%] max-w-[400px] bg-white z-[60] transition-transform duration-500 ease-out md:hidden shadow-2xl ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <Image
              src="/Commerx-Logo-black.svg"
              alt="COMMERX"
              width={140}
              height={30}
              className="h-7 w-auto"
            />
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-black" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-[#888] text-[12px] font-bold uppercase tracking-widest">
                  Solutions
                </p>
                <div className="grid grid-cols-1 gap-3">
                  {solutions.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-[18px] font-medium text-black hover:text-[#D32F2F] transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="h-px bg-gray-100" />

              <div className="flex flex-col space-y-6">
                <Link
                  href="/blog"
                  className="text-[20px] font-medium text-black hover:text-[#D32F2F] transition-colors"
                >
                  Insights
                </Link>
                <Link
                  href="/about-us"
                  className="text-[20px] font-medium text-black hover:text-[#D32F2F] transition-colors"
                >
                  About
                </Link>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gray-50 border-t border-gray-100">
            <Link
              href="/contact"
              className="bg-[#D32F2F] text-white w-full py-4 rounded-sm text-[18px] font-cal font-normal flex items-center justify-center gap-3 active:scale-[0.98] transition-all"
            >
              Request a Consultation
              <ArrowIcon color="#ffffff" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
