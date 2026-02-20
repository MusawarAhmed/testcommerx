import type { Block } from 'payload'

export const PathwaySection: Block = {
  slug: 'pathwaySection',
  interfaceName: 'PathwaySectionBlock',
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
      defaultValue: 'The Pathway To Success',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
      defaultValue: 'Technical And Marketing Complexity Becomes Manageable Through An Integrated, Accountable Process Built For Measurable Outcomes.',
    },
    {
      name: 'features',
      label: 'Features',
      type: 'array',
      // minRows: 1, // Optional: You can make it optional if you want
      fields: [
        {
          name: 'text',
          type: 'text', // Changed from textarea to text, usually features are short
          required: true,
        },
      ],
    },
    {
      name: 'steps',
      label: 'Steps',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'number',
          label: 'Number',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          label: 'Step Title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Step Description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'align',
          label: 'Alignment',
          type: 'select',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Right', value: 'right' },
          ],
          defaultValue: 'right', // Default to right as in the first item
          required: true,
        },
      ],
    },
  ],
  labels: {
    plural: 'Pathway Sections',
    singular: 'Pathway Section',
  },
}
