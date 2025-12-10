import article from './article';
import author from './author';
import category from './category';
import issue from './issue';
import event from './event';
import guide from './guide';
import publication from './publication';
import siteSettings from './siteSettings';
import homePage from './homePage';
import aboutPage from './aboutPage';
import contactPage from './contactPage';
import page from './page';
import teamMember from './teamMember';
import blockContent from './blockContent';

export const schemaTypes = [
  // Document types
  article,
  author,
  category,
  issue,
  event,
  guide,
  publication,
  siteSettings,
  homePage,
  aboutPage,
  contactPage,
  page,
  teamMember,
  // Object types
  blockContent,
];
