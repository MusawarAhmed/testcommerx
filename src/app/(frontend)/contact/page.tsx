"use client";

import Image from 'next/image';
import ContactForm from '../_components/common/ContactForm';



export default function ContactPage() {
    return (
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
                        Contact
                    </span>
                    <h1 className="text-[48px] md:text-[64px] font-cal text-black leading-tight">
                        Our Presence
                    </h1>
                    <p className="text-[16px] font-sans text-gray-600 max-w-2xl mx-auto">
                        We have offices and teams all around the world
                    </p>
                </div>

                {/* Map Section */}
                <div className="site-containers relative w-full h-[300px] md:h-[600px] mb-20">
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/contact_map.png"
                            alt="World Map"
                            fill
                            className="object-contain object-center"
                            priority
                        />
                    </div>


                    {/* Calgary Card */}
                    {/* <div className="absolute top-[10%] left-[5%] md:top-[15%] md:left-[20%] bg-white p-6 rounded-lg shadow-xl max-w-[280px] z-10 hidden md:block animate-fade-in">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-2xl">🇨🇦</span>
                            <h3 className="text-[18px] font-bold font-cal text-black">Calgary</h3>
                        </div>
                        <div className="space-y-1 font-sans text-[13px] text-gray-600 leading-relaxed">
                            <p>4428 Manilla Road SE,</p>
                            <p>Calgary, T2G 4B7</p>
                            <p>Tel: 403-301-3883</p>
                        </div>
                    </div> */}

                    {/* Phoenix Card */}
                    {/* <div className="absolute top-[35%] left-[5%] md:top-[40%] md:left-[15%] bg-white p-6 rounded-lg shadow-xl max-w-[280px] z-10 hidden md:block animate-fade-in delay-100">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-2xl">🇺🇸</span>
                            <h3 className="text-[18px] font-bold font-cal text-black">Phoenix</h3>
                        </div>
                        <div className="space-y-1 font-sans text-[13px] text-gray-600 leading-relaxed">
                            <p>20 East Thomas Road</p>
                            <p>Suite 2271</p>
                            <p>Phoenix, AZ, 85012</p>
                            <p>Tel: 602-800-5725</p>
                        </div>
                    </div> */}
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

            {/* Section 2: Form */}
            <section className="py-20 relative z-10">
                <div className="site-containers">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-[32px] md:text-[48px] font-cal text-black leading-tight">
                            Let’s Build Your Next Competitive Advantage
                        </h2>
                        <p className="text-[14px] font-sans font-normal leading-none text-[#D02030] tracking-wide capitalize">
                            From marketing to infrastructure, our experts are ready to help you design the connected future of your business.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto bg-white rounded-[4px] shadow-[0_15px_40px_rgb(0,0,0,0.12)] p-8 md:p-16 border border-gray-100">
                        <ContactForm />
                    </div>
                </div>
            </section>
        </main>
    );
}
