import type { Block } from 'payload'

export const AboutHeroSection: Block = {
  slug: 'aboutHeroSection',
  interfaceName: 'AboutHeroSectionBlock',
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge Label (e.g. "About Us")',
      defaultValue: 'About Us',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Main Heading',
      required: true,
      defaultValue: 'Your Integrated Partner for Connected Technology and Scalable Growth',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Sub-description',
      defaultValue:
        'Commerx is built on a foundation of integration. We connect marketing technology, data, and strategy into a single growth system—driving performance for enterprises looking to scale in a digitally complex world.',
    },
    {
      name: 'primaryButton',
      type: 'group',
      label: 'Primary Button (Solid)',
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Button Text',
          defaultValue: 'Request a Consultation',
        },
        {
          name: 'link',
          type: 'text',
          label: 'Button Link',
          defaultValue: '/contact',
        },
      ],
    },
    {
      name: 'secondaryButton',
      type: 'group',
      label: 'Secondary Button (Link style)',
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Button Text',
          defaultValue: 'Learn About Us',
        },
        {
          name: 'link',
          type: 'text',
          label: 'Button Link',
          defaultValue: '/about',
        },
      ],
    },
    {
      name: 'showBackgroundPatterns',
      type: 'checkbox',
      label: 'Show Background Decorative Patterns',
      defaultValue: true,
    },
  ],
  labels: {
    plural: 'About Hero Sections',
    singular: 'About Hero Section',
  },
}
