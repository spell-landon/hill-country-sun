// GROQ queries for Sanity

// Articles
export const allArticlesQuery = `*[_type == "article"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  publishedAt,
  featured,
  "author": author->{
    name,
    image
  },
  "category": category->title
}`;

export const featuredArticlesQuery = `*[_type == "article" && featured == true] | order(publishedAt desc)[0...4] {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  publishedAt,
  "author": author->{
    name,
    image
  },
  "category": category->title
}`;

export const articleBySlugQuery = `*[_type == "article" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  body,
  publishedAt,
  "author": author->{
    name,
    image,
    bio,
    role
  },
  "category": category->title,
  "relatedArticles": relatedArticles[]->{
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    publishedAt,
    "category": category->title
  }
}`;

// Magazine Issues
export const allIssuesQuery = `*[_type == "issue"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  coverImage,
  issuuEmbedUrl,
  issuuShareUrl,
  publishedAt,
  isCurrent,
  description
}`;

export const currentIssueQuery = `*[_type == "issue" && isCurrent == true][0] {
  _id,
  title,
  slug,
  coverImage,
  issuuEmbedUrl,
  issuuShareUrl,
  publishedAt,
  isCurrent,
  description,
  highlights
}`;

export const issueBySlugQuery = `*[_type == "issue" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  coverImage,
  issuuEmbedUrl,
  issuuShareUrl,
  publishedAt,
  isCurrent,
  description,
  highlights
}`;

// Events
export const upcomingEventsQuery = `*[_type == "event" && date >= now()] | order(date asc) {
  _id,
  title,
  slug,
  description,
  date,
  endDate,
  location,
  address,
  link,
  image,
  category,
  featured
}`;

export const allEventsQuery = `*[_type == "event"] | order(date desc) {
  _id,
  title,
  slug,
  description,
  date,
  endDate,
  location,
  address,
  link,
  image,
  category,
  featured
}`;

// Guides
export const guideBySlugQuery = `*[_type == "guide" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  heroImage,
  intro,
  icon,
  sections,
  "relatedArticles": relatedArticles[]->{
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    publishedAt,
    "category": category->title
  },
  ctaTitle,
  ctaDescription,
  ctaButtons
}`;

// Site Settings
export const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  title,
  description,
  logo,
  contact,
  social,
  publisher,
  editor,
  advertisingEmail,
  foundedYear
}`;

// Categories
export const allCategoriesQuery = `*[_type == "category"] | order(title asc) {
  _id,
  title,
  slug,
  description,
  color
}`;

// Authors
export const allAuthorsQuery = `*[_type == "author"] | order(name asc) {
  _id,
  name,
  slug,
  image,
  bio,
  role
}`;
