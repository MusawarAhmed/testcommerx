'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowIcon } from '../_components/layout/Icons'
import CTASection from '../_components/common/CTASection'
import TabSection from '../_components/common/TabSection'
import HelpSection from '../_components/common/HelpSection'
import PathwaySection from '../_components/common/PathwaySection'
const marketingMockData = [
  {
    id: 'Branding',
    tabLabel: 'Branding',
    title: '',
    titleAccent: '',
    tags: [
      'Brand Strategy',
      'Positioning & Messaging',
      'Visual Identity',
      'Brand Guidelines',
      'Creative Production',
      'Sales & Marketing Collateral',
    ],
    descriptionHeading: 'Build A Cohesive Brand System That Earns Trust And Drives Preference.',
    description:
      'At Strategic Business Solutions, we specialize in crafting business strategies that go beyond mere plans. They are blueprints for growth, innovation, solution and enduring compassing that prosperity.',
    image: '/capabilities-branding.png',
  },
  {
    id: 'paid-media',
    tabLabel: 'Paid Media',
    title: '',
    titleAccent: '',
    tags: [
      'Campaign Strategy & Management',
      'Search Advertising',
      'Paid Social Advertising',
      'Display & Retargeting',
      'Conversion Tracking & Analytics',
      'Performance Reporting & Optimization',
    ],
    descriptionHeading: 'Performance-Driven Campaigns Optimized For Measurable ROI.',
    description:
      'We engineer data-backed paid strategies—across search, social, and display—specifically designed to capture high-intent traffic and convert it into a predictable pipeline of qualified leads.',
    image: '/capabilities-paid-media.png',
  },
  {
    id: 'seo-content',
    tabLabel: 'SEO & Content',
    title: '',
    titleAccent: '',
    tags: [
      'SEO Strategy',
      'Technical SEO',
      'On-Page Optimization',
      'Content Strategy',
      'Content Production',
      'Content Optimization & Reporting',
    ],
    descriptionHeading: 'Establish Industry Dominance Through Strategic Authority.',
    description:
      'Position your brand as a trusted voice in your category—driving sustained inbound demand and supporting conversion throughout the buyer journey.',
    image: '/capabilities-seo.png',
  },
  {
    id: 'design',
    tabLabel: 'Design',
    title: '',
    titleAccent: '',
    tags: [
      'Website Strategy',
      'UI / UX Design',
      'Website & Landing Pages',
      'Conversion Rate Optimization (CRO)',
      'Website Content & Copy',
      'Performance & Analytics Setup',
    ],
    descriptionHeading:
      'Accelerate Growth With Data-Driven Strategy, Creative Design, And Performance Marketing.',
    description:
      'At Strategic Business Solutions, we specialize in crafting business strategies that go beyond mere plans. They are blueprints for growth, innovation, solution and enduring compassing that prosperity.',
    image: '/capabilities-design.png',
  },
  {
    id: 'b2b-lead-gen',
    tabLabel: 'B2B Lead Gen',
    title: '',
    titleAccent: '',
    tags: [
      'Lead Generation Strategy',
      'Prospecting & List Building',
      'Email Outreach Campaigns',
      'LinkedIn Outreach Campaigns',
      'Appointment Setting',
      'Lead Gen Reporting & Optimization',
    ],
    descriptionHeading: 'Scalable Outbound Engines That Bridge The Gap To Revenue.',
    description:
      'At Strategic Business Solutions, we specialize in crafting business strategies that go beyond mere plans. They are blueprints for growth, innovation, solution and enduring compassing that prosperity.',
    image: '/capabilities-lead-gen.png',
  },
]
export default function MarketingPage() {
  return (
    <>
      <main className="bg-white min-h-screen relative overflow-hidden">
        {/* Top Background Pattern */}
        <div className="absolute -top-25 -left-125 w-[800px] h-[900px] z-11 pointer-events-none ">
          <Image
            src="/home-insight-sec-bg.svg"
            alt="Background Pattern"
            fill
            className="object-contain object-top-left"
          />
        </div>

        {/* Bottom Background Pattern - Rotated/flipped for variety */}
        <div className="absolute top-[35%] -right-116 w-[800px] h-[900px] z-11 pointer-events-none rotate-180">
          <Image
            src="/home-insight-sec-bg.svg"
            alt="Background Pattern"
            fill
            className="object-contain"
          />
        </div>

        {/* Section 1: Our Presence */}
        <section className="pt-32 pb-10 relative z-10">
          <div className="site-containers text-center space-y-4 mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#FFEAEB] text-[#D02030] text-[12px] font-bold tracking-wider uppercase mb-4">
              Marketing & Branding
            </span>
            <h1 className="text-[48px] md:text-[64px] font-cal text-black leading-tight">
              Accelerate Growth with Data-Driven Marketing and Brand Intelligence
            </h1>
            <p className="text-[16px] font-sans text-gray-600 mx-auto">
              Align strategy, campaigns, and measurement to convert brand foundation into a
              high-performance engine for measurable growth.
            </p>
            <div className="flex justify-center pt-4">
              <Link
                href="/contact"
                className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-10 py-3.5 rounded-sm text-[16px] font-cal font-normal flex items-center gap-2 transition-all group"
              >
                Request a Consultation
                <ArrowIcon
                  color="#ffffff"
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </div>

          {/* Map Section */}
          <div className="site-containers relative w-full h-[300px] md:h-[600px] mb-20 px-[120px]">
            <div className="relative w-full h-full z-0">
              <Image
                src="/contact_map.png"
                alt="World Map"
                fill
                className="object-contain object-center"
                priority
              />
            </div>
          </div>

          {/* Mobile Locations (Stack below map) */}
          <div className="site-containers grid grid-cols-1 md:hidden gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🇨🇦</span>
                <h3 className="text-[18px] font-bold font-cal text-black">Calgary</h3>
              </div>
              <div className="space-y-1 font-sans text-[14px] text-gray-600">
                <p>4428 Manilla Road SE,</p>
                <p>Calgary, T2G 4B7</p>
                <p>Tel: 403-301-3883</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🇺🇸</span>
                <h3 className="text-[18px] font-bold font-cal text-black">Phoenix</h3>
              </div>
              <div className="space-y-1 font-sans text-[14px] text-gray-600">
                <p>20 East Thomas Road</p>
                <p>Suite 2271</p>
                <p>Phoenix, AZ, 85012</p>
                <p>Tel: 602-800-5725</p>
              </div>
            </div>
          </div>
        </section>
        <HelpSection />
        <TabSection legacyCapabilities={marketingMockData} />
        <PathwaySection />
        <CTASection />
      </main>
    </>
  )
}
