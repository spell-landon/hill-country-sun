import article from './article';
import author from './author';
import category from './category';
import issue from './issue';
import event from './event';
import guide from './guide';
import publication from './publication';
import siteSettings from './siteSettings';
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
  // Object types
  blockContent,
];
