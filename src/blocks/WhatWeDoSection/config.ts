import type { Block } from 'payload'

export const WhatWeDoSection: Block = {
  slug: 'whatWeDoSection',
  interfaceName: 'WhatWeDoSectionBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
      required: true,
      defaultValue: 'What We Do',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Service Cards',
      minRows: 1,
      interfaceName: 'WhatWeDoItem',
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: undefined,
        },
      },
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Icon Image',
          required: true,
        },
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
    plural: 'What We Do Sections',
    singular: 'What We Do Section',
  },
}
