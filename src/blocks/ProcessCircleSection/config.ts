import type { Block } from 'payload'

export const ProcessCircleSection: Block = {
  slug: 'processCircleSection',
  interfaceName: 'ProcessCircleSectionBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Section Heading',
      defaultValue: 'How We Work',
    },
    {
      name: 'centerImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Center Image/Logo',
      required: false,
    },
    {
      name: 'steps',
      type: 'array',
      label: 'Quadrant Steps',
      minRows: 4,
      maxRows: 4,
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Step Title',
          required: true,
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Icon',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Step Description',
          required: false,
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
    plural: 'Process Circle Sections',
    singular: 'Process Circle Section',
  },
}
