"use client";

import { useState } from "react";

import { LinkIcon, CheckIcon } from "../layout/Icons";





interface ShareButtonsProps {
    title: string;
    slug: string;
}

export default function ShareButtons({ title, slug }: ShareButtonsProps) {
    const [isCopied, setIsCopied] = useState(false);

    const getShareUrl = () => {
        if (typeof window !== "undefined") {
            return `${window.location.origin}/blog/${slug}`;
        }
        return "";
    };

    const handleCopy = async () => {
        try {
            const url = getShareUrl();
            if (!url) return;
            await navigator.clipboard.writeText(url);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy!", err);
        }
    };

    const handleShareLinkedIn = () => {
        const url = getShareUrl();
        if (!url) return;
        const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        window.open(linkedInUrl, "_blank", "noopener,noreferrer");
    };

    const handleShareX = () => {
        const url = getShareUrl();
        if (!url) return;
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        window.open(twitterUrl, "_blank", "noopener,noreferrer");
    };

    return (
        <div className="flex items-center gap-6 mt-8 md:mt-0">
            <span className="text-[24px] font-sans text-black">Share:</span>

            {/* Copy Link */}
            <button
                onClick={handleCopy}
                className="hover:opacity-70 transition-opacity cursor-pointer"
                aria-label="Copy Link"
            >
                {isCopied ? (
                    <CheckIcon className="w-6 h-6" color="#10B981" />
                ) : (
                    <LinkIcon className="w-8 h-8" color="#000000" />
                )}
            </button>

            {/* X (Twitter) - Using simple text/icon style as per image */}
            <button
                onClick={handleShareX}
                className="hover:opacity-70 transition-opacity cursor-pointer"
                aria-label="Share on X"
            >
                {/* Custom X Logo Path matching the style in the image if possible, or standard */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
                    <path d="M18.901 0H22.581L14.541 9.177L24 21.644H16.594L10.794 14.075L4.156 21.644H0.474L9.049 11.861L0 0H7.58L12.846 6.945L18.901 0ZM17.61 19.445H19.649L6.486 2.062H4.298L17.61 19.445Z" fill="black" />
                </svg>
            </button>

            {/* LinkedIn */}
            <button
                onClick={handleShareLinkedIn}
                className="hover:opacity-70 transition-opacity cursor-pointer"
                aria-label="Share on LinkedIn"
            >
                {/* Solid square Linked In Icon matching the image */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
                    <path d="M21.6 0H2.4C1.08 0 0 1.08 0 2.4V21.6C0 22.92 1.08 24 2.4 24H21.6C22.92 24 24 22.92 24 21.6V2.4C24 1.08 22.92 0 21.6 0ZM7.2 20.4H3.6V9.6H7.2V20.4ZM5.4 7.92C4.2 7.92 3.6 6.96 3.6 6C3.6 4.92 4.2 4.08 5.4 4.08C6.6 4.08 7.2 4.92 7.2 6C7.2 6.96 6.6 7.92 5.4 7.92ZM20.4 20.4H16.8V14.4C16.8 13.2 16.2 12.36 15 12.36C13.92 12.36 13.32 13.08 13.2 13.92V20.4H9.6V9.6H13.2V11.16C13.8 10.2 15 9.36 16.56 9.36C18.96 9.36 20.4 10.92 20.4 14.16V20.4Z" fill="black" />
                </svg>
            </button>
        </div>
    );
}
