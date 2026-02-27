import type { Block } from 'payload'

export const HelpSection: Block = {
  slug: 'helpSection',
  interfaceName: 'HelpSectionBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
      required: true,
      defaultValue: 'How We Can Help',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Help Items',
      minRows: 1,
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
    plural: 'Help Sections',
    singular: 'Help Section',
  },
}
