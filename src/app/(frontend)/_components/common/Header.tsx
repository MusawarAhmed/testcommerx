"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ArrowIcon } from '../layout/Icons';
import { usePathname } from 'next/navigation';

export default function Header() {
    const pathname = usePathname();
    const isLightPage = pathname === '/contact' || pathname?.startsWith('/blog') || pathname === '/privacy-policy' || pathname === '/terms-of-service' || pathname === '/marketing';
    const showMenu = pathname?.startsWith('/blog');

    return (
        <header className={`absolute top-0 left-0 w-full z-50 border-b ${isLightPage ? 'border-gray-100' : 'border-white/10'}`}>
            <nav className="site-containers flex items-center justify-between py-6">
                <div className="flex items-center gap-12">
                    <Link href="/" className="flex items-center">
                        <Image
                            src={isLightPage ? "/Commerx-Logo-black.svg" : "/Commerx-Logo-Color.svg"}
                            alt="COMMERX"
                            width={180}
                            height={40}
                            className="h-8 md:h-10 w-auto"
                            priority
                        />
                    </Link>
                    {showMenu && (
                        <div className="hidden md:flex items-center space-x-8 text-black/90 font-medium">
                            <Link href="/services" className="hover:text-[#D02030] transition-colors">Services</Link>
                            <Link href="/solutions" className="hover:text-[#D02030] transition-colors">Solutions</Link>
                            <Link href="/blog" className="hover:text-[#D02030] transition-colors">Blog</Link>
                            <Link href="/about" className="hover:text-[#D02030] transition-colors">About</Link>
                        </div>
                    )}
                </div>
                <Link
                    href="/contact"
                    className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-6 py-2.5 rounded-sm text-[16px] font-cal font-normal flex items-center gap-2 transition-all group"
                >
                    Request a Consultation
                    <ArrowIcon color="#ffffff" className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </nav>
        </header>
    );
}
