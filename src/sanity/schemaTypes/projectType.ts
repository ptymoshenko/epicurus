import { defineField, defineType } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'lightTags',
      title: 'Light tag text',
      type: 'boolean',
      description: 'Use white text for tags overlaid on dark images',
      initialValue: false,
    }),
    defineField({
      name: 'tall',
      title: 'Tall card',
      type: 'boolean',
      description: 'Makes this card taller in the desktop staggered grid',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      type: 'number',
      description: 'Controls display order (lower = first)',
    }),
    defineField({
      name: 'body',
      title: 'Project description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
