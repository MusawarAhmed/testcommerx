import Hero, { HeroSlide } from "./_components/home/Hero";
import InsightsSection from "./_components/home/InsightsSection";
import StatsSection from "./_components/home/StatsSection";
import TabSection from "./_components/home/TabSection";
import CompaniesSection from "./_components/home/CompaniesSection";
import CTASection from "./_components/common/CTASection";
import { InsightsBlock, HomePageData, LayoutBlock, TabSectionBlock, StatsSectionBlock } from "./_lib/api";
import { getHomePageData } from "./_lib/data";

const mockHeroSlides: HeroSlide[] = [
  {
    id: "1",
    tabLabel: "IT & Technology",
    subtitle: "IT & Technology Solutions",
    title: "Transforming operations through secure, scalable digital systems.",
    image: "/slide1.png",
    link: "/solutions/it-technology"
  },
  {
    id: "2",
    tabLabel: "Telecom",
    subtitle: "Telecom & Network Infrastructure",
    title: "Connecting enterprises with reliable, high-performance networks.",
    image: "/slide2.png",
    link: "/solutions/telecom"
  },
  {
    id: "3",
    tabLabel: "IoT",
    subtitle: "IoT, Telematics & Connected Systems",
    title: "Turning connected data into intelligent, real-time decision power.",
    image: "/slide3.png",
    link: "/solutions/iot"
  },
  {
    id: "4",
    tabLabel: "Marketing",
    subtitle: "Marketing & Branding",
    title: "Empowering brands to grow smarter, faster, and with measurable impact.",
    image: "/slide4.png",
    link: "/solutions/marketing"
  },
  {
    id: "5",
    tabLabel: "Reputation",
    subtitle: "Reputation Management",
    title: "Building trust and resilience through intelligent reputation control",
    image: "/slide5.png",
    link: "/solutions/reputation-management"
  }
];

const mockCapabilities = [
  {
    id: 'it',
    tabLabel: 'IT & Technology',
    title: 'IT & Technology',
    titleAccent: 'Solutions',
    tags: ['Unify your systems', 'Modernize your stack', 'Secure your network', 'Scale without compromise', 'Protect your data', 'Automate with confidence'],
    descriptionHeading: 'Modernize your systems, secure your data, and build scalable infrastructure that drives innovation.',
    description: 'In the ever-evolving landscape of business, are in robust and well defined strategies is the compassing that guides your journey to success. At Strategic Business Solutions, we specialize in crafting business strategies that go beyond mere plans. They are blueprints for growth, innovation, solution and enduring compassing that prosperity.',
    image: '/capabilities-it.png',
  },
  {
    id: 'telecom',
    tabLabel: 'Telecom',
    title: 'Telecom & Network',
    titleAccent: 'Infrastructure',
    tags: ['Optimize connectivity', 'High-speed networks', 'Reliable systems', 'Global reach', 'Secure data transfer', 'Always connected'],
    descriptionHeading: 'Engineer reliable, high performance networks that keep your business connected and future-ready.',
    description: 'Communication is the lifeblood of any modern enterprise. We provide end-to-end telecommunication solutions that ensure seamless connectivity across your entire organization. From fiber networks to secure wireless protocols, we build the infrastructure that powers your digital future.',
    image: '/capabilities-telecom.png',
  },
  {
    id: 'iot',
    tabLabel: 'IoT',
    title: 'IoT, Telematics &',
    titleAccent: 'Connected Systems',
    tags: ['Smart devices', 'Real-time data', 'Predictive maintenance', 'Automated logistics', 'Enhanced visibility', 'Data-driven insights'],
    descriptionHeading: 'Gain real-time visibility and control of assets, vehicles, and mobile workforce through connected intelligence.',
    description: 'Our IoT solutions transform idle data into actionable intelligence. By connecting your physical assets to a digital brain, we enable predictive analytics and automated workflows that significantly reduce operational costs and increase safety and efficiency overhead.',
    image: '/capabilities-iot.png',
  },
  {
    id: 'marketing',
    tabLabel: 'Marketing',
    title: 'Marketing &',
    titleAccent: 'Branding',
    tags: ['Creative strategy', 'Digital reach', 'Brand positioning', 'Content creation', 'Social engagement', 'SEO & Analytics'],
    descriptionHeading: 'Accelerate growth with data-driven strategy, creative design, and performance monitoring.',
    description: 'In a crowded marketplace, standing out is essential. We combine data-driven insights with creative excellence to build brands that resonate and campaigns that convert. Our holistic approach ensures your message is consistent and impactful across every digital touchpoint.',
    image: '/capabilities-marketing.png',
  },
  {
    id: 'reputation',
    tabLabel: 'Reputation',
    title: 'Reputation',
    titleAccent: 'Management',
    tags: ['Protect your brand', 'Crisis response', 'Proactive monitoring', 'Review management', 'Brand sentiment', 'Authority building'],
    descriptionHeading: 'Protect and strengthen your brand with proactive, AI-powered monitoring and engagement.',
    description: 'Your reputation is your most valuable asset. We use advanced sentiment analysis and proactive engagement strategies to safeguard your brand digital footprint. From managing online reviews to mitigating crisis risks, we ensure your professional identity remains pristine.',
    image: '/capabilities-reputation.png',
  },
];

export default async function Home() {
  let homeData: HomePageData | null = null;
  let heroSlides = mockHeroSlides;
  let insightsData: InsightsBlock | undefined;
  let tabSectionData: TabSectionBlock | undefined;
  let statsSectionData: StatsSectionBlock | undefined;

  try {
    homeData = await getHomePageData();

    if (homeData) {
      if (homeData.hero && homeData.hero.heroSlides) {
        heroSlides = homeData.hero.heroSlides as unknown as HeroSlide[];
      }

      insightsData = homeData.layout?.find((block: LayoutBlock) => block.blockType === 'insightsSection') as InsightsBlock | undefined;
      tabSectionData = homeData.layout?.find((block: LayoutBlock) => block.blockType === 'tabSection') as TabSectionBlock | undefined;
      statsSectionData = homeData.layout?.find((block: LayoutBlock) => block.blockType === 'statsSection') as StatsSectionBlock | undefined;
    }
  } catch (error) {
    console.error("Failed to load home page data, falling back to mocks", error);
  }

  return (
    <>
      <Hero heroSlides={heroSlides} />
      <InsightsSection data={insightsData} />
      <TabSection data={tabSectionData} legacyCapabilities={mockCapabilities} />
      <StatsSection data={statsSectionData} />
      <CompaniesSection />
      <CTASection />
    </>
  );
}
