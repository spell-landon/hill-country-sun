import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'issue',
  title: 'Magazine Issue',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g., "Holiday 2025-26", "Fall 2025"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'issuuEmbedUrl',
      title: 'Issuu Embed URL',
      type: 'url',
      description: 'The embed URL from Issuu for the digital flipbook',
    }),
    defineField({
      name: 'issuuShareUrl',
      title: 'Issuu Share URL',
      type: 'url',
      description: 'The shareable link to the issue on Issuu',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isCurrent',
      title: 'Current Issue',
      type: 'boolean',
      description: 'Mark this as the current/latest issue',
      initialValue: false,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'A brief description of this issue\'s contents',
    }),
    defineField({
      name: 'highlights',
      title: 'Issue Highlights',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Key stories or features in this issue',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      isCurrent: 'isCurrent',
      publishedAt: 'publishedAt',
    },
    prepare(selection) {
      const { isCurrent, publishedAt } = selection;
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString()
        : '';
      return {
        ...selection,
        subtitle: isCurrent ? `Current Issue • ${date}` : date,
      };
    },
  },
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
});
