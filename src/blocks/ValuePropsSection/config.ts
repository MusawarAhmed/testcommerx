import type { Block } from 'payload'

export const ValuePropsSection: Block = {
  slug: 'valuePropsSection',
  interfaceName: 'ValuePropsSectionBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Section Heading',
      defaultValue: 'A Better Way With Commerx',
    },
    {
      name: 'cards',
      type: 'array',
      label: 'Value Prop Cards',
      minRows: 4,
      maxRows: 4,
      fields: [
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
          required: false,
        },
      ],
    },
  ],
  labels: {
    plural: 'Value Props Sections',
    singular: 'Value Props Section',
  },
}
