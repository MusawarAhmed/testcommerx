
// Types definitions based on API response
export interface MediaSize {
    url: string | null;
    width: number | null;
    height: number | null;
    mimeType: string | null;
    filesize: number | null;
    filename: string | null;
}

export interface Media {
    id: string | number;
    alt: string;
    url: string;
    filename: string;
    mimeType?: string | null;
    filesize?: number | null;
    width?: number | null;
    height?: number | null;
    sizes?: {
        thumbnail?: MediaSize;
        square?: MediaSize;
        small?: MediaSize;
        medium?: MediaSize;
        large?: MediaSize;
        xlarge?: MediaSize;
        og?: MediaSize;
    };
}

export interface HeroSlide {
    id: string;
    tabLabel: string;
    subtitle: string;
    title: string;
    image: Media | string; // API can return object or ID string, usually object if depth is sufficient
    link?: string;
}

export interface HeroSection {
    type: string;
    heroSlides: HeroSlide[];
}

export interface InsightsBlock {
    blockType: 'insightsSection';
    title: string;
    description1: string;
    description2: string;
    leftImage: Media;
    bgImage: Media;
    linkText: string;
    linkUrl: string;
    id: string;
}

export interface TabItem {
    id: string;
    tabLabel: string;
    contentTitle: string;
    tags: {
        text: string;
        id: string;
    }[];
    innerTitle: string;
    innerDescription: string;
    image: Media | string;
    linkText?: string;
    linkUrl?: string;
}

export interface TabSectionBlock {
    blockType: 'tabSection';
    title: string;
    description: string;
    tabs: TabItem[];
    id: string;
}

export interface StatItem {
    value: string;
    label: string;
    id: string;
}

export interface StatsSectionBlock {
    blockType: 'statsSection';
    title: string;
    description: string;
    backgroundImage: Media;
    stats: StatItem[];
    id: string;
}

export type LayoutBlock = InsightsBlock | TabSectionBlock | StatsSectionBlock;

export interface HomePageData {
    id: string;
    title: string;
    hero: HeroSection;
    layout: LayoutBlock[];
    meta: {
        title: string;
        description: string;
        image: Media;
    };
}


