import Image from 'next/image';
import { Media } from '../../_lib/api';

interface Company {
    id: string | number;
    name: string;
    logo: Media | string;
}

interface CompaniesSectionProps {
    data?: {
        title: string;
        companies: Company[];
    };
}

export default function CompaniesSection({ data }: CompaniesSectionProps) {
    const title = data?.title || "Commerx Companies";
    const companies = data?.companies || [];

    // Helper to get image URL
    const getImageUrl = (image: Media | string | null | undefined) => {
        if (!image) return '';
        const url = typeof image === 'string' ? image : image.url;
        if (!url) return '';
        if (url.startsWith('http')) return url;
        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
        return `${serverUrl}${url}`;
    };

    return (
        <section className="py-20 bg-white">
            <div className="site-containers">
                <h2 className="text-center text-[28px] md:text-[48px] font-cal mb-16">
                    <span className="text-black">
                        {title.split(' ')[0]} 
                    </span>
                    <span className="text-[#D02030]">
                        {' '}{title.split(' ').slice(1).join(' ')}
                    </span>
                </h2>

                <div className="flex flex-wrap items-center justify-center md:justify-between gap-10 md:gap-8">
                    {companies.map((company, index) => (
                        <div key={company.id || index} className="relative w-[180px] h-[60px] transition-all duration-300">
                            <Image
                                src={getImageUrl(company.logo)}
                                alt={company.name}
                                fill
                                className="object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
