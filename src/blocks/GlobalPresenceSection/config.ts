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
    {
      name: 'locations',
      type: 'array',
      label: 'Office Locations',
      fields: [
        {
          name: 'countryFlag',
          type: 'text',
          label: 'Country Flag Emoji',
          defaultValue: '🇨🇦',
          required: true,
        },
        {
          name: 'city',
          type: 'text',
          label: 'City Name',
          required: true,
        },
        {
          name: 'address',
          type: 'textarea',
          label: 'Address & Phone (Lines)',
          required: true,
        }
      ]
    }
  ],
  labels: {
    plural: 'Global Presence Sections',
    singular: 'Global Presence Section',
  },
}
