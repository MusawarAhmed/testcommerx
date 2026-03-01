import type { Block } from 'payload'

export const ContactSection: Block = {
  slug: 'contactSection',
  interfaceName: 'ContactSectionBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Section Heading',
      defaultValue: 'Let’s Build Your Next Competitive Advantage',
    },
    {
      name: 'subtext',
      type: 'textarea',
      label: 'Subtext Description',
      required: true,
      defaultValue: 'From marketing to infrastructure, our experts are ready to help you design the connected future of your business.',
    },
  ],
  labels: {
    plural: 'Contact Sections',
    singular: 'Contact Section',
  },
}
