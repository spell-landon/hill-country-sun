import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Content Section
      S.listItem()
        .title('Content')
        .child(
          S.list()
            .title('Content')
            .items([
              S.documentTypeListItem('article').title('Articles'),
              S.documentTypeListItem('author').title('Authors'),
              S.documentTypeListItem('category').title('Categories'),
            ])
        ),

      S.divider(),

      // Publications Section
      S.listItem()
        .title('Publications')
        .child(
          S.list()
            .title('Publications')
            .items([
              S.documentTypeListItem('publication').title('All Publications'),
              S.documentTypeListItem('issue').title('Magazine Issues'),
              S.documentTypeListItem('guide').title('Guides'),
            ])
        ),

      S.divider(),

      // Events Section
      S.documentTypeListItem('event').title('Events'),

      S.divider(),

      // Settings Section
      S.listItem()
        .title('Settings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings')
        ),
    ]);
