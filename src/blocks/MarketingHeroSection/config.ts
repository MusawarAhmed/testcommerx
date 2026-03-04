import type { Block } from 'payload'

export const MarketingHeroSection: Block = {
  slug: 'marketingHeroSection',
  interfaceName: 'MarketingHeroSectionBlock',
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge Label (e.g. "Marketing & Branding")',
      defaultValue: 'Marketing & Branding',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Main Heading',
      required: true,
      defaultValue: 'Accelerate Growth with Data-Driven Marketing and Brand Intelligence',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Sub-description',
      defaultValue:
        'Align strategy, campaigns, and measurement to convert brand foundation into a high-performance engine for measurable growth.',
    },
    {
      name: 'buttonText',
      type: 'text',
      label: 'Button Text',
      defaultValue: 'Request a Consultation',
    },
    {
      name: 'buttonLink',
      type: 'text',
      label: 'Button Link',
      defaultValue: '/contact',
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero Image / Map',
      required: true,
    },
    {
      name: 'showBackgroundPatterns',
      type: 'checkbox',
      label: 'Show Background Decorative Patterns',
      defaultValue: true,
    },
  ],
  labels: {
    plural: 'Marketing Hero Sections',
    singular: 'Marketing Hero Section',
  },
}
