import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Create the Sanity client
export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'v33ykncb',
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
});

// Image URL builder
const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Helper to format dates
export function formatSanityDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// ============================================================================
// Types
// ============================================================================

export interface SanityArticle {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  body: any[]; // Portable Text
  mainImage: SanityImageSource & { alt?: string };
  author: {
    _id: string;
    name: string;
    slug: { current: string };
    image: SanityImageSource;
  };
  category: {
    _id: string;
    title: string;
    slug: { current: string };
    color?: string;
  };
  publication?: {
    _id: string;
    name: string;
    shortName: string;
    slug: { current: string };
  };
  publishedAt: string;
  featured: boolean;
}

export interface SanityAuthor {
  _id: string;
  name: string;
  slug: { current: string };
  image: SanityImageSource;
  bio?: string;
  role?: string;
}

export interface SanityCategory {
  _id: string;
  title: string;
  slug: { current: string };
  color?: string;
}

export interface SanityIssue {
  _id: string;
  title: string;
  slug: { current: string };
  coverImage: SanityImageSource & { alt?: string };
  issuuEmbedUrl: string;
  publishedAt: string;
  isCurrent: boolean;
  publication?: {
    _id: string;
    name: string;
    shortName: string;
    slug: { current: string };
  };
}

export interface SanityEvent {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  date: string;
  endDate?: string;
  location: string;
  link?: string;
  image?: SanityImageSource;
  category: string;
  featured?: boolean;
}

export interface SanityPublication {
  _id: string;
  name: string;
  shortName: string;
  slug: { current: string };
  description: string;
  heroImage: SanityImageSource & { alt?: string };
  logo?: SanityImageSource;
  sections?: {
    _key: string;
    title: string;
    content: string;
    image?: SanityImageSource;
  }[];
}

// ============================================================================
// GROQ Queries
// ============================================================================

// Article queries
const articleFields = `
  _id,
  title,
  slug,
  excerpt,
  body,
  mainImage,
  "author": author->{_id, name, slug, image},
  "category": category->{_id, title, slug, color},
  "publication": publication->{_id, name, shortName, slug},
  publishedAt,
  featured
`;

export async function getArticles(): Promise<SanityArticle[]> {
  return client.fetch(`
    *[_type == "article"] | order(publishedAt desc) {
      ${articleFields}
    }
  `);
}

export async function getFeaturedArticles(): Promise<SanityArticle[]> {
  return client.fetch(`
    *[_type == "article" && featured == true] | order(publishedAt desc) {
      ${articleFields}
    }
  `);
}

export async function getLatestArticles(limit: number = 6): Promise<SanityArticle[]> {
  return client.fetch(`
    *[_type == "article"] | order(publishedAt desc)[0...${limit}] {
      ${articleFields}
    }
  `);
}

export async function getArticleBySlug(slug: string): Promise<SanityArticle | null> {
  return client.fetch(`
    *[_type == "article" && slug.current == $slug][0] {
      ${articleFields}
    }
  `, { slug });
}

export async function getArticlesByPublication(publicationSlug: string): Promise<SanityArticle[]> {
  return client.fetch(`
    *[_type == "article" && publication->slug.current == $publicationSlug] | order(publishedAt desc) {
      ${articleFields}
    }
  `, { publicationSlug });
}

export async function getArticlesByAuthor(authorSlug: string): Promise<SanityArticle[]> {
  return client.fetch(`
    *[_type == "article" && author->slug.current == $authorSlug] | order(publishedAt desc) {
      ${articleFields}
    }
  `, { authorSlug });
}

export async function getArticlesByCategory(categorySlug: string): Promise<SanityArticle[]> {
  return client.fetch(`
    *[_type == "article" && category->slug.current == $categorySlug] | order(publishedAt desc) {
      ${articleFields}
    }
  `, { categorySlug });
}

// Author queries
export async function getAuthors(): Promise<SanityAuthor[]> {
  return client.fetch(`
    *[_type == "author"] | order(name asc) {
      _id,
      name,
      slug,
      image,
      bio,
      role
    }
  `);
}

export async function getAuthorBySlug(slug: string): Promise<SanityAuthor | null> {
  return client.fetch(`
    *[_type == "author" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      image,
      bio,
      role
    }
  `, { slug });
}

// Category queries
export async function getCategories(): Promise<SanityCategory[]> {
  return client.fetch(`
    *[_type == "category"] | order(title asc) {
      _id,
      title,
      slug,
      color
    }
  `);
}

// Publication queries
export async function getPublications(): Promise<SanityPublication[]> {
  return client.fetch(`
    *[_type == "publication"] | order(name asc) {
      _id,
      name,
      shortName,
      slug,
      description,
      heroImage,
      logo,
      sections
    }
  `);
}

export async function getPublicationBySlug(slug: string): Promise<SanityPublication | null> {
  return client.fetch(`
    *[_type == "publication" && slug.current == $slug][0] {
      _id,
      name,
      shortName,
      slug,
      description,
      heroImage,
      logo,
      sections
    }
  `, { slug });
}

// Issue queries
export async function getIssues(): Promise<SanityIssue[]> {
  return client.fetch(`
    *[_type == "issue"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      coverImage,
      issuuEmbedUrl,
      publishedAt,
      isCurrent,
      "publication": publication->{_id, name, shortName, slug}
    }
  `);
}

export async function getIssuesByPublication(publicationSlug: string): Promise<SanityIssue[]> {
  return client.fetch(`
    *[_type == "issue" && publication->slug.current == $publicationSlug] | order(publishedAt desc) {
      _id,
      title,
      slug,
      coverImage,
      issuuEmbedUrl,
      publishedAt,
      isCurrent,
      "publication": publication->{_id, name, shortName, slug}
    }
  `, { publicationSlug });
}

export async function getIssueBySlug(slug: string): Promise<SanityIssue | null> {
  return client.fetch(`
    *[_type == "issue" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      coverImage,
      issuuEmbedUrl,
      publishedAt,
      isCurrent,
      "publication": publication->{_id, name, shortName, slug}
    }
  `, { slug });
}

export async function getCurrentIssue(publicationSlug?: string): Promise<SanityIssue | null> {
  if (publicationSlug) {
    // Get most recent issue for a specific publication
    return client.fetch(`
      *[_type == "issue" && publication->slug.current == $publicationSlug] | order(publishedAt desc)[0] {
        _id,
        title,
        slug,
        coverImage,
        issuuEmbedUrl,
        publishedAt,
        isCurrent,
        "publication": publication->{_id, name, shortName, slug}
      }
    `, { publicationSlug });
  }
  // Get most recent issue across all publications
  return client.fetch(`
    *[_type == "issue"] | order(publishedAt desc)[0] {
      _id,
      title,
      slug,
      coverImage,
      issuuEmbedUrl,
      publishedAt,
      isCurrent,
      "publication": publication->{_id, name, shortName, slug}
    }
  `);
}

// Event queries
export async function getEvents(): Promise<SanityEvent[]> {
  return client.fetch(`
    *[_type == "event"] | order(date asc) {
      _id,
      title,
      slug,
      description,
      date,
      endDate,
      location,
      link,
      image,
      category,
      featured
    }
  `);
}

export async function getUpcomingEvents(limit: number = 6): Promise<SanityEvent[]> {
  const today = new Date().toISOString().split('T')[0];
  return client.fetch(`
    *[_type == "event" && date >= $today] | order(date asc)[0...${limit}] {
      _id,
      title,
      slug,
      description,
      date,
      endDate,
      location,
      link,
      image,
      category,
      featured
    }
  `, { today });
}

// Utility functions for filtering
export async function getUniqueCategories(): Promise<string[]> {
  const categories = await client.fetch(`
    *[_type == "category"].title
  `);
  return categories;
}

export async function getArticleYears(): Promise<number[]> {
  const dates = await client.fetch(`
    *[_type == "article"].publishedAt
  `);
  const years = dates.map((date: string) => new Date(date).getFullYear());
  return [...new Set(years)].sort((a: number, b: number) => b - a);
}

// About Page queries
export interface SanityAboutPage {
  _id: string;
  heroTitle: string;
  heroSubtitle: string;
  missionTitle: string;
  missionContent: any[]; // Portable Text
  storyTitle: string;
  storyContent: any[]; // Portable Text
  storyImage: SanityImageSource & { alt?: string };
  foundedYear: string;
  teamTitle: string;
  teamSubtitle: string;
  teamMembers: {
    _key: string;
    name: string;
    role: string;
    email?: string;
    image: SanityImageSource;
    bio: string;
  }[];
  stats: {
    _key: string;
    value: string;
    label: string;
  }[];
}

export async function getAboutPage(): Promise<SanityAboutPage | null> {
  return client.fetch(`
    *[_type == "aboutPage"][0] {
      _id,
      heroTitle,
      heroSubtitle,
      missionTitle,
      missionContent,
      storyTitle,
      storyContent,
      storyImage,
      foundedYear,
      teamTitle,
      teamSubtitle,
      teamMembers,
      stats
    }
  `);
}

// Contact Page queries
export interface SanityContactPage {
  _id: string;
  heroTitle: string;
  heroSubtitle: string;
  formTitle: string;
  contactInfo: {
    _key: string;
    type: 'email' | 'phone' | 'location' | 'hours';
    label: string;
    value: string;
    href?: string;
  }[];
  inquiryTypes: {
    _key: string;
    value: string;
    label: string;
  }[];
  successTitle: string;
  successMessage: string;
}

export async function getContactPage(): Promise<SanityContactPage | null> {
  return client.fetch(`
    *[_type == "contactPage"][0] {
      _id,
      heroTitle,
      heroSubtitle,
      formTitle,
      contactInfo,
      inquiryTypes,
      successTitle,
      successMessage
    }
  `);
}

// Site Settings queries
export interface SanitySiteSettings {
  _id: string;
  title: string;
  description: string;
  logo?: SanityImageSource;
  contact: {
    email?: string;
    phone?: string;
    address?: string;
    hours?: string;
  };
  footer?: {
    tagline?: string;
    copyrightText?: string;
  };
  social: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  publisher?: {
    name?: string;
    email?: string;
  };
  editor?: {
    name?: string;
    email?: string;
  };
  advertisingEmail?: string;
  foundedYear?: number;
}

export async function getSiteSettings(): Promise<SanitySiteSettings | null> {
  return client.fetch(`
    *[_type == "siteSettings"][0] {
      _id,
      title,
      description,
      logo,
      contact,
      footer,
      social,
      publisher,
      editor,
      advertisingEmail,
      foundedYear
    }
  `);
}

// Page queries (for legal pages like Privacy, Terms, etc.)
export interface SanityPage {
  _id: string;
  title: string;
  slug: { current: string };
  lastUpdated?: string;
  content: any[]; // Portable Text
}

export async function getPageBySlug(slug: string): Promise<SanityPage | null> {
  return client.fetch(`
    *[_type == "page" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      lastUpdated,
      content
    }
  `, { slug });
}
