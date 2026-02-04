import type { Block } from 'payload'

export const TabSection: Block = {
  slug: 'tabSection',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Heading',
      required: true,
      defaultValue: 'Integrated Capabilities. One Strategic Partner.',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Section Description',
      defaultValue: 'Our expertise spans every layer of your enterprise - seamlessly connected to deliver intelligence, performance, and profitability.',
    },
    {
      name: 'tabs',
      type: 'array',
      label: 'Tabs',
      minRows: 1,
      fields: [
        {
          name: 'tabLabel',
          type: 'text',
          label: 'Tab Label',
          required: true,
        },
        {
          name: 'contentTitle',
          type: 'text',
          label: 'Content Title',
        },
        {
            name: 'tags',
            type: 'array',
            label: 'Tags/Pills',
            fields: [
                {
                    name: 'text',
                    type: 'text',
                    label: 'Tag Text',
                }
            ]
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            label: 'Image',
            required: true,
        },
        {
            name: 'innerTitle',
            type: 'text',
            label: 'Inner Heading',
        },
        {
            name: 'innerDescription',
            type: 'textarea',
            label: 'Inner Description',
        },
        {
            name: 'linkText',
            type: 'text',
            label: 'Link Text',
            defaultValue: 'Learn More',
        },
        {
            name: 'linkUrl',
            type: 'text',
            label: 'Link URL',
        },
      ],
    },
  ],
  labels: {
    plural: 'Tab Sections',
    singular: 'Tab Section',
  },
}
