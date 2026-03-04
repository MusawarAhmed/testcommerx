import type { Block } from 'payload'

export const BetterWaySection: Block = {
  slug: 'betterWaySection',
  interfaceName: 'BetterWaySectionBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
      required: true,
      defaultValue: 'A Better Way With Commerx',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image/Pattern',
      required: false,
    },
    {
      name: 'showBackgroundPatterns',
      type: 'checkbox',
      label: 'Show Background Decorative Patterns',
      defaultValue: true,
    },
    {
      name: 'items',
      type: 'array',
      label: 'Feature Cards',
      minRows: 1,
      interfaceName: 'BetterWayItem',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          required: true,
        },
      ],
    },
  ],
  labels: {
    plural: 'Better Way Sections',
    singular: 'Better Way Section',
  },
}
