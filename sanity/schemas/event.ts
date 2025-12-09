import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
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
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Start Date & Time',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date & Time',
      type: 'datetime',
      description: 'Optional - for multi-day events',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 2,
      description: 'Full address for map integration',
    }),
    defineField({
      name: 'link',
      title: 'Event Link',
      type: 'url',
      description: 'Link to more information or tickets',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Community', value: 'Community' },
          { title: 'Arts & Culture', value: 'Arts & Culture' },
          { title: 'Music', value: 'Music' },
          { title: 'Food & Drink', value: 'Food & Drink' },
          { title: 'Shopping', value: 'Shopping' },
          { title: 'Sports & Recreation', value: 'Sports & Recreation' },
          { title: 'Outdoors', value: 'Outdoors' },
          { title: 'Family', value: 'Family' },
          { title: 'Other', value: 'Other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'recurring',
      title: 'Recurring Event',
      type: 'string',
      options: {
        list: [
          { title: 'One-time', value: 'none' },
          { title: 'Weekly', value: 'weekly' },
          { title: 'Monthly', value: 'monthly' },
          { title: 'First Saturday', value: 'first-saturday' },
        ],
      },
      initialValue: 'none',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Event',
      type: 'boolean',
      description: 'Show this event prominently on the calendar',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      location: 'location',
      media: 'image',
    },
    prepare(selection) {
      const { date, location } = selection;
      const dateStr = date
        ? new Date(date).toLocaleDateString()
        : 'No date';
      return {
        ...selection,
        subtitle: `${dateStr} • ${location || 'No location'}`,
      };
    },
  },
  orderings: [
    {
      title: 'Event Date, Upcoming',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }],
    },
  ],
});
