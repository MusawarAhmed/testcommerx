import type { Block } from 'payload'

export const MissionVisionSection: Block = {
  slug: 'missionVisionSection',
  interfaceName: 'MissionVisionSectionBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
      required: true,
      defaultValue: 'Our Mission And Vision',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Mission/Vision Cards',
      minRows: 1,
      interfaceName: 'MissionVisionItem',
      admin: {
        initCollapsed: true,
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
    plural: 'Mission & Vision Sections',
    singular: 'Mission & Vision Section',
  },
}
