import type { Block } from 'payload'

export const WhyCommerxSection: Block = {
  slug: 'whyCommerxSection',
  interfaceName: 'WhyCommerxSectionBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      required: true,
      defaultValue: 'Why Commerx?',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      defaultValue:
        'Most teams struggle when marketing is fragmented—strategy in one place, creative in another, and performance data scattered across tools. Commerx connects brand, demand generation, web experience, and measurement into a single growth system—so you can move faster and prove impact.',
    },
    {
      name: 'items',
      type: 'array',
      interfaceName: 'WhyCommerxItem',
      label: 'Items',
      minRows: 1,
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Text',
          required: true,
        },
      ],
    },
  ],
  labels: {
    plural: 'Why Commerx Sections',
    singular: 'Why Commerx Section',
  },
}
