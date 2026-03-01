import type { Block } from 'payload'

export const ServicePillarsSection: Block = {
  slug: 'servicePillarsSection',
  interfaceName: 'ServicePillarsSectionBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Section Heading',
      defaultValue: 'What We Do',
    },
    {
      name: 'introText',
      type: 'textarea',
      label: 'Introduction Text',
      required: false,
    },
    {
      name: 'pillars',
      type: 'array',
      label: 'Service Pillars (Cards)',
      minRows: 1,
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Card Icon',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Card Title',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Card Description',
          required: true,
        },
        {
          name: 'isHighlighted',
          type: 'checkbox',
          label: 'Highlight Card (Red Background)',
          defaultValue: false,
        },
      ],
    },
  ],
  labels: {
    plural: 'Service Pillars Sections',
    singular: 'Service Pillars Section',
  },
}
