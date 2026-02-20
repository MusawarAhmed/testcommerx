"use client";

import React from 'react';
import Image from 'next/image';

const steps = [
    {
        number: "1",
        title: "Align",
        description: "Define Goals, Audience, And Success Metrics To Establish A Clear Go-To-Market (GTM) And Measurement Plan.",
        align: "right"
    },
    {
        number: "2",
        title: "Execute",
        description: "Launch Integrated Campaigns, Creative Content, And Digital Experiences With Full Tracking Active From Day One.",
        align: "left"
    },
    {
        number: "3",
        title: "Optimize",
        description: "Analyze real-time data to refine strategies, improve engagement, and maximize return on ad spend (ROAS) and ROI.", // Corrected logical text for Optimize since image had duplicate
        align: "right"
    }
];

const features = [
    "Intelligence-Driven Architecture",
    "Proactive Operational Control",
    "Built For Scalable Growth"
];

export default function PathwaySection() {
    return (
        <section className="py-20 bg-white relative overflow-hidden">
             {/* Background Pattern - Faint red lines */}
            <div className="absolute top-0 right-0 w-[600px] h-[800px] pointer-events-none opacity-50 translate-x-1/3 -translate-y-1/4">
                 <Image
                    src="/home-insight-sec-bg.svg" // Reusing the pattern seen in other sections
                    alt="Background Pattern"
                    fill
                    className="object-contain"
                />
            </div>

            <div className="site-containers grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                {/* Left Content */}
                <div className="space-y-8 z-10">
                    <h2 className="text-[32px] md:text-[56px] font-cal text-black leading-[1.1]">
                        The Pathway To <br className="hidden md:block"/> Success
                    </h2>
                    
                    <p className="text-[16px] text-gray-700 font-sans leading-relaxed max-w-md">
                        Technical And Marketing Complexity Becomes Manageable Through An Integrated, Accountable Process Built For Measurable Outcomes.
                    </p>

                    <div className="space-y-4 pt-2">
                        {features.map((feature, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#D02030] flex items-center justify-center">
                                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 1L3.5 6.5L1 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </span>
                                <span className="text-[16px] font-bold font-sans text-gray-800">
                                    {feature}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Timeline */}
                <div className="relative z-10 p-4">


                    <div className="space-y-12 lg:space-y-16">
                        {steps.map((step, index) => (
                             <div key={index} className={`relative flex items-start ${step.align === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-0`}>
                                {/* Connectivity Line (Except last item) */}
                                {index !== steps.length - 1 && (
                                     <div className="absolute left-[30px] lg:left-1/2 top-4 -bottom-12 lg:-bottom-24 w-px border-l-2 border-dashed border-red-200 transform -translate-x-1/2"></div>
                                )}
                                
                                {/* Timeline Node (Number) */}
                                <div className="absolute left-[30px] lg:left-1/2 transform -translate-x-1/2 flex-shrink-0 w-[40px] h-[40px] rounded-full bg-[#FFEAEB] text-[#D02030] font-bold text-lg flex items-center justify-center z-20 shadow-sm border-2 border-white">
                                    {step.number}
                                </div>

                                {/* Content Card */}
                                <div className={`w-full lg:w-1/2 pl-20 lg:pl-0 ${step.align === 'right' ? 'lg:pl-16' : 'lg:pr-16'}`}>
                                     <div className="bg-[#F3F6FD] p-6 rounded-[12px] shadow-sm hover:shadow-md transition-shadow">
                                        <h3 className="text-[20px] font-bold font-sans text-black mb-3">
                                            {step.title}
                                        </h3>
                                        <p className="text-[14px] text-gray-600 leading-relaxed font-sans">
                                            {step.description}
                                        </p>
                                     </div>
                                </div>
                                <div className="hidden lg:block w-1/2"></div>
                             </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
