import type { Block } from 'payload'

export const CTASectionBlock: Block = {
  slug: 'ctaSection',
  interfaceName: 'CTASectionBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      required: true,
      defaultValue: "Let's Build Your Next Competitive Advantage",
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      defaultValue:
        'From marketing to infrastructure, our experts are ready to help you design the connected future of your business.',
    },
  ],
  labels: {
    plural: 'CTA Sections',
    singular: 'CTA Section',
  },
}
