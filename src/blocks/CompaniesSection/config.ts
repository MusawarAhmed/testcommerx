import type { Block } from 'payload'

export const CompaniesSection: Block = {
  slug: 'companiesSection',
  interfaceName: 'CompaniesSectionBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Heading',
      required: true,
      defaultValue: 'Commerx Companies',
    },
    {
      name: 'companies',
      type: 'array',
      label: 'Companies',
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Company Name',
          required: true,
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          label: 'Company Logo',
          required: true,
        },
      ],
    },
  ],
  labels: {
    plural: 'Companies Sections',
    singular: 'Companies Section',
  },
}
