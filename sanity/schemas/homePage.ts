import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    // Hero Section
    defineField({
      name: 'heroTagline',
      title: 'Hero Tagline',
      type: 'string',
      description: 'Small text above the main heading',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      description: 'Main heading text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 3,
      description: 'Description text below the heading',
    }),
    defineField({
      name: 'heroBackgroundImage',
      title: 'Hero Background Image',
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
    }),
    defineField({
      name: 'heroCtaPrimaryText',
      title: 'Primary CTA Button Text',
      type: 'string',
      description: 'Text for the main call-to-action button (links to latest issue)',
      initialValue: 'Read Latest Issue',
    }),
    defineField({
      name: 'heroCtaSecondaryText',
      title: 'Secondary CTA Button Text',
      type: 'string',
      description: 'Text for the secondary button (links to articles)',
      initialValue: 'Explore Articles',
    }),

    // Publications Section
    defineField({
      name: 'publicationsSectionTitle',
      title: 'Publications Section Title',
      type: 'string',
      initialValue: 'Explore Our Publications',
    }),
    defineField({
      name: 'publicationsSectionSubtitle',
      title: 'Publications Section Subtitle',
      type: 'text',
      rows: 2,
      initialValue: 'In-depth resources to help you make the most of the Hill Country.',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Home Page',
      };
    },
  },
});
