"use client";

import React from 'react';

const helpItems = [
    {
        title: "Brand Architecture",
        description: "Scalable positioning and identity systems ensure market value is instantly clear. Consistent messaging and identity create a foundation that strengthens credibility across every enterprise touchpoint."
    },
    {
        title: "Demand Generation",
        description: "Strategic programs designed to move beyond clicks to high-intent conversion. These systems improve lead quality, accelerate sales velocity, and deliver a verifiable revenue impact."
    },
    {
        title: "Growth Integration",
        description: "Growth stalls when data is disconnected. Aligning marketing stacks, tracking, and the digital experience ensures that performance remains visible and continuously improvable."
    }
];

export default function HelpSection() {
    return (
        <section className="py-20 bg-white">
            <div className="site-containers">
                <div className="text-center mb-16">
                    <h2 className="text-[32px] md:text-[48px] font-cal text-[#D02030] leading-tight">
                        How We Can Help
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {helpItems.map((item, index) => (
                        <div 
                            key={index} 
                            className="bg-[#F3F6FD] rounded-[16px] p-8 md:p-10 flex flex-col items-center text-center h-full hover:shadow-md transition-shadow duration-300"
                        >
                            <h3 className="text-[20px] md:text-[24px] font-bold font-sans text-black mb-6">
                                {item.title}
                            </h3>
                            <p className="text-[16px] text-[#000000] font-sans leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
