import type { Block } from 'payload'

export const StorySection: Block = {
  slug: 'storySection',
  interfaceName: 'StorySectionBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Heading',
      defaultValue: 'Our Story',
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Story Content',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Side Image',
      required: true,
    },
  ],
  labels: {
    plural: 'Story Sections',
    singular: 'Story Section',
  },
}
