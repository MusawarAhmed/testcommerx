import Link from 'next/link';
import Image from 'next/image';
import { LinkedInIcon, YoutubeIcon, XIcon, MailIcon, PhoneIcon } from '../layout/Icons';

export default function Footer() {
    return (
        <footer className="bg-black text-white py-16 border-t border-white/10">
            <div className="site-containers">
                <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-8">
                    {/* Left side: Logo and Contact */}
                    <div className="space-y-8 max-w-xs">
                        <Link href="/" className="flex items-center">
                            <Image
                                src="/Commerx-Logo-Color.svg"
                                alt="COMMERX"
                                width={180}
                                height={40}
                                className="h-8 md:h-10 w-auto"
                            />
                        </Link>

                        <div className="space-y-4 font-sans text-[12px] font-normal text-white/70">
                            <div className="flex items-center gap-3">
                                <MailIcon color="#ffffff" className="w-3 h-3" />
                                <a href="mailto:info@commerx.com" className="hover:text-white transition-colors">info@commerx.com</a>
                            </div>
                            <div className="flex items-center gap-3">
                                <PhoneIcon color="#ffffff" className="w-3 h-3" />
                                <a href="tel:1-833-301-3883" className="hover:text-white transition-colors">1-833-301-3883</a>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <Link href="#" className="hover:opacity-75 transition-opacity">
                                <LinkedInIcon color="#ffffff" className="w-4 h-4" />
                            </Link>
                            <Link href="#" className="hover:opacity-75 transition-opacity">
                                <YoutubeIcon color="#ffffff" className="w-4 h-4" />
                            </Link>
                            <Link href="#" className="hover:opacity-75 transition-opacity">
                                <XIcon color="#ffffff" className="w-4 h-4" />
                            </Link>
                        </div>

                        <p className="font-cal text-[12px] font-normal text-white pt-4">
                            © 2026 Commerx Inc. All Rights Reserved.
                        </p>
                    </div>

                    {/* Right side: Grouped Links and Locations */}
                    <div className="flex flex-col md:flex-row gap-12 md:gap-20 lg:gap-32">
                        {/* Column 2: Quick Links */}
                        <div className="space-y-6">
                            <h4 className="font-cal text-[12px] font-normal uppercase tracking-wider text-white">Quick Links</h4>
                            <ul className="space-y-4 font-sans text-[12px] font-normal text-white/70">
                                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                            </ul>
                        </div>

                        {/* Column 3: Locations */}
                        <div className="space-y-12">
                            <div className="space-y-6">
                                <h4 className="font-cal text-[12px] font-normal uppercase tracking-wider text-white">Canada</h4>
                                <div className="space-y-1 font-sans text-[12px] font-normal text-white/70">
                                    <p>4428 Manilla Road SE,</p>
                                    <p>Calgary, T2G 4B7</p>
                                    <p>Tel: 403-301-3883</p>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <h4 className="font-cal text-[12px] font-normal uppercase tracking-wider text-white">United States</h4>
                                <div className="space-y-1 font-sans text-[12px] font-normal text-white/70">
                                    <p>20 East Thomas Road</p>
                                    <p>Suite 2271</p>
                                    <p>Phoenix, AZ, 85012</p>
                                    <p>Tel: 602-800-5725</p>
                                </div>
                            </div>
                        </div>

                        {/* Column 4: Legal */}
                        <div className="space-y-6">
                            <h4 className="font-cal text-[12px] font-normal uppercase tracking-wider text-white">Legal</h4>
                            <ul className="space-y-4 font-sans text-[12px] font-normal text-white/70">
                                <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                                <li><Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
