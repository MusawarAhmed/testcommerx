"use client";

export default function ContactForm() {
    return (
        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <label htmlFor="name" className="text-[16px] font-sans text-[#8F8F8F] block">Name*</label>
                    <input
                        type="text"
                        id="name"
                        required
                        className="w-full border-b border-gray-300 py-2 focus:border-[#D02030] outline-none transition-colors text-black"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="company" className="text-[16px] font-sans text-[#8F8F8F] block">Company*</label>
                    <input
                        type="text"
                        id="company"
                        required
                        className="w-full border-b border-gray-300 py-2 focus:border-[#D02030] outline-none transition-colors text-black"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="email" className="text-[16px] font-sans text-[#8F8F8F] block">Work Email*</label>
                <input
                    type="email"
                    id="email"
                    required
                    className="w-full border-b border-gray-300 py-2 focus:border-[#D02030] outline-none transition-colors text-black"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="challenge" className="text-[16px] font-sans text-[#8F8F8F] block">What challenge are you trying to solve?</label>
                <input
                    type="text"
                    id="challenge"
                    className="w-full border-b border-gray-300 py-2 focus:border-[#D02030] outline-none transition-colors text-black"
                />
            </div>

            <div className="pt-4">
                <button
                    type="submit"
                    className="bg-[#D02030] text-white px-8 py-3 rounded-full font-cal text-[12px] cursor-pointer hover:bg-[#B01A28] transition-all transform hover:scale-105"
                >
                    Request Consultation
                </button>
            </div>
        </form>
    );
}
