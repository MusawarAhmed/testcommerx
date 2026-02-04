import type { Block } from 'payload'

export const InsightsSection: Block = {
  slug: 'insightsSection',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Heading',
      defaultValue: '',
    },
    {
      name: 'description1',
      type: 'textarea',
      label: 'Main Description',
      defaultValue: '',
    },
    {
      name: 'description2',
      type: 'textarea',
      label: 'Bold Description',
      defaultValue: '',
    },
    {
      name: 'leftImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Left Image (Main)',
      required: true,
    },
    {
      name: 'bgImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Pattern (Optional)',
    },
    {
        name: 'linkText',
        type: 'text',
        label: 'Link Text',
        defaultValue: '',
    },
    {
        name: 'linkUrl',
        type: 'text',
        label: 'Link URL',
        defaultValue: '',
    }
  ],
  labels: {
    plural: 'Insights Sections',
    singular: 'Insights Section',
  },
}
