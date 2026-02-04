import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
        // --- 1. WE ADD THE NEW SLIDER OPTION HERE ---
        {
          label: 'Home Page Slider',
          value: 'slider',
        },
      ],
      required: true,
    },

    // --- 2. WE ADD THE ARRAY FIELD FOR YOUR 5 SLIDES ---
    {
      name: 'heroSlides',
      type: 'array', // This creates a list you can add items to
      label: 'Hero Slides',
      minRows: 1,
      maxRows: 6,
      admin: {
        // This magic line makes the list appear ONLY when you select "Home Page Slider"
        condition: (_, { type } = {}) => type === 'slider',
      },
      fields: [
        {
          type: 'row', // Groups fields side-by-side
          fields: [
            {
              name: 'tabLabel',
              type: 'text',
              label: 'Tab Name (e.g. "Telecom")', // The name for the bottom tab
              required: true,
              admin: { width: '50%' },
            },
            {
              name: 'subtitle',
              type: 'text',
              label: 'Subtitle (e.g. "Telecom Solutions")', // The small text above headline
              required: true,
              admin: { width: '50%' },
            },
          ],
        },
        {
          name: 'title',
          type: 'textarea', // Box for the main headline
          label: 'Main Headline',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media', // Connects to your Media collection
          required: true,
          label: 'Background Image',
        },
        {
            name: 'link',
            type: 'text',
            label: 'Button Link (Optional)',
        }
      ],
    },

    // --- 3. WE HIDE THE OLD FIELDS WHEN SLIDER IS ACTIVE ---
    {
      name: 'richText',
      type: 'richText',
      admin: {
        // Hides this field if type is 'slider'
        condition: (_, { type } = {}) => type !== 'slider' && type !== 'none',
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
        admin: {
           // Hides the standard buttons if type is 'slider'
           condition: (_, { type } = {}) => type !== 'slider',
        }
      },
    }),
    {
      name: 'media',
      type: 'upload',
      admin: {
        // Only shows for High/Medium impact (Hides for Slider)
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
  ],
  label: false,
}