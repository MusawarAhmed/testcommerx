import type { Block } from 'payload'

export const QuoteBlock: Block = {
  slug: 'quoteBlock',
  interfaceName: 'QuoteBlock',
  labels: {
    singular: 'Quote',
    plural: 'Quotes',
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      label: 'Quote',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'authorFirstName',
          type: 'text',
          label: 'Author First Name',
          required: true,
        },
        {
          name: 'authorLastName',
          type: 'text',
          label: 'Author Last Name',
          required: true,
        },
      ],
    },
    {
      name: 'authorPicture',
      type: 'upload',
      label: 'Author Picture',
      relationTo: 'media',
    },
  ],
}
