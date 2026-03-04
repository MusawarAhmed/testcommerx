import type { Block } from 'payload'

export const GlobalPresenceSection: Block = {
  slug: 'globalPresenceSection',
  interfaceName: 'GlobalPresenceSectionBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Section Heading',
      defaultValue: 'Our Presence',
    },
    {
      name: 'subtext',
      type: 'textarea',
      label: 'Subtext Description',
      required: true,
    },
    {
      name: 'mapImage',
      type: 'upload',
      relationTo: 'media',
      label: 'World Map Visual',
      required: true,
    },
  ],
  labels: {
    plural: 'Global Presence Sections',
    singular: 'Global Presence Section',
  },
}
