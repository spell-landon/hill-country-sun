import type { StructureBuilder } from 'sanity/structure';
import { BookOpen, FileText, Users, Tag, Calendar, Map, Settings, Info, Mail, Scale } from 'lucide-react';

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Publications
      S.listItem()
        .title('Publications')
        .icon(BookOpen)
        .child(S.documentTypeList('publication').title('Publications')),

      // Articles
      S.listItem()
        .title('Articles')
        .icon(FileText)
        .child(S.documentTypeList('article').title('Articles')),

      // Issues
      S.listItem()
        .title('Issues')
        .icon(BookOpen)
        .child(S.documentTypeList('issue').title('Issues')),

      // Events
      S.listItem()
        .title('Events')
        .icon(Calendar)
        .child(S.documentTypeList('event').title('Events')),

      S.divider(),

      // Authors
      S.listItem()
        .title('Authors')
        .icon(Users)
        .child(S.documentTypeList('author').title('Authors')),

      // Categories
      S.listItem()
        .title('Categories')
        .icon(Tag)
        .child(S.documentTypeList('category').title('Categories')),

      // Guides
      S.listItem()
        .title('Guides')
        .icon(Map)
        .child(S.documentTypeList('guide').title('Guides')),

      S.divider(),

      // Pages section - singletons
      S.listItem()
        .title('Pages')
        .icon(FileText)
        .child(
          S.list()
            .title('Pages')
            .items([
              // About Page (singleton)
              S.listItem()
                .title('About Page')
                .icon(Info)
                .child(
                  S.document()
                    .schemaType('aboutPage')
                    .documentId('aboutPage')
                    .title('About Page')
                ),
              // Contact Page (singleton)
              S.listItem()
                .title('Contact Page')
                .icon(Mail)
                .child(
                  S.document()
                    .schemaType('contactPage')
                    .documentId('contactPage')
                    .title('Contact Page')
                ),
            ])
        ),

      // Legal Pages
      S.listItem()
        .title('Legal Pages')
        .icon(Scale)
        .child(S.documentTypeList('page').title('Legal Pages')),

      // Site Settings (singleton)
      S.listItem()
        .title('Site Settings')
        .icon(Settings)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings')
        ),
    ]);
