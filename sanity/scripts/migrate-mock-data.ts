/**
 * Migration script to upload mock data to Sanity CMS
 *
 * Usage:
 *   SANITY_API_TOKEN=your-token npm run sanity:migrate
 *
 * Requires a Sanity API token with write permissions.
 * Get one from: https://sanity.io/manage → Your Project → API → Tokens
 */

import { createClient, type SanityClient } from "@sanity/client";
import { htmlToPortableText } from "./html-to-portable-text.js";

// Import mock data
import {
  mockArticles,
  mockIssues,
  mockEvents,
  mockPublications,
  type Article,
  type MagazineIssue,
  type Event,
  type Publication,
} from "../../app/lib/mock-data.js";

// Sanity configuration
const PROJECT_ID = process.env.SANITY_PROJECT_ID || "v33ykncb";
const DATASET = process.env.SANITY_DATASET || "production";
const API_TOKEN = process.env.SANITY_API_TOKEN;

if (!API_TOKEN) {
  console.error("❌ SANITY_API_TOKEN environment variable is required");
  console.error("   Get a token from: https://sanity.io/manage → API → Tokens");
  console.error("   Then run: SANITY_API_TOKEN=your-token npm run sanity:migrate");
  process.exit(1);
}

const client: SanityClient = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: "2024-01-01",
  token: API_TOKEN,
  useCdn: false,
});

// Store for created document IDs (for references)
const publicationIds = new Map<string, string>();
const authorIds = new Map<string, string>();
const categoryIds = new Map<string, string>();

// ============================================================================
// Helper Functions
// ============================================================================

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function uploadImageFromUrl(
  url: string,
  filename: string
): Promise<{ _type: "image"; asset: { _type: "reference"; _ref: string }; externalUrl: string } | null> {
  try {
    console.log(`  📷 Downloading: ${filename}`);
    const response = await fetch(url);

    if (!response.ok) {
      console.warn(`  ⚠️  Failed to fetch image: ${url}`);
      return null;
    }

    const buffer = await response.arrayBuffer();
    const asset = await client.assets.upload("image", Buffer.from(buffer), {
      filename,
    });

    console.log(`  ✅ Uploaded: ${asset._id}`);

    return {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: asset._id,
      },
      externalUrl: url, // Store original URL as fallback
    };
  } catch (error) {
    console.error(`  ❌ Failed to upload image: ${error}`);
    return null;
  }
}

async function documentExists(type: string, slug: string): Promise<string | null> {
  const query = `*[_type == $type && slug.current == $slug][0]._id`;
  const result = await client.fetch(query, { type, slug });
  return result || null;
}

// ============================================================================
// Migration Functions
// ============================================================================

async function migrateAuthors(): Promise<void> {
  console.log("\n📝 Migrating Authors...");

  // Extract unique authors from articles
  const uniqueAuthors = new Map<string, { name: string; image: string }>();

  for (const article of mockArticles) {
    if (!uniqueAuthors.has(article.author.name)) {
      uniqueAuthors.set(article.author.name, article.author);
    }
  }

  for (const [name, author] of uniqueAuthors) {
    const slug = slugify(name);

    // Check if already exists
    const existingId = await documentExists("author", slug);
    if (existingId) {
      console.log(`  ⏭️  Skipping (exists): ${name}`);
      authorIds.set(name, existingId);
      continue;
    }

    // Upload author image
    const imageAsset = await uploadImageFromUrl(
      author.image,
      `author-${slug}.jpg`
    );

    const doc = {
      _type: "author",
      name: author.name,
      slug: { _type: "slug", current: slug },
      image: imageAsset,
      role: "Contributing Writer",
    };

    const result = await client.create(doc);
    authorIds.set(name, result._id);
    console.log(`  ✅ Created: ${name} (${result._id})`);
  }
}

async function migrateCategories(): Promise<void> {
  console.log("\n📂 Migrating Categories...");

  // Extract unique categories from articles
  const categories = [...new Set(mockArticles.map((a) => a.category))];

  // Add colors for categories
  const categoryColors: Record<string, string> = {
    Events: "#D4A574",
    Outdoors: "#4A7C59",
    "Arts & Culture": "#8B5CF6",
    "Food & Drink": "#F59E0B",
    History: "#6B7280",
  };

  for (const title of categories) {
    const slug = slugify(title);

    // Check if already exists
    const existingId = await documentExists("category", slug);
    if (existingId) {
      console.log(`  ⏭️  Skipping (exists): ${title}`);
      categoryIds.set(title, existingId);
      continue;
    }

    const doc = {
      _type: "category",
      title,
      slug: { _type: "slug", current: slug },
      color: categoryColors[title] || "#6B7280",
    };

    const result = await client.create(doc);
    categoryIds.set(title, result._id);
    console.log(`  ✅ Created: ${title} (${result._id})`);
  }
}

async function migrateArticles(): Promise<void> {
  console.log("\n📰 Migrating Articles...");

  for (const article of mockArticles) {
    // Check if already exists
    const existingId = await documentExists("article", article.slug);
    if (existingId) {
      console.log(`  ⏭️  Skipping (exists): ${article.title}`);
      continue;
    }

    console.log(`  📄 Processing: ${article.title}`);

    // Upload main image
    const mainImage = await uploadImageFromUrl(
      article.mainImage,
      `article-${article.slug}.jpg`
    );

    // Convert HTML content to Portable Text
    const body = htmlToPortableText(article.content);

    // Get references
    const authorId = authorIds.get(article.author.name);
    const categoryId = categoryIds.get(article.category);
    const publicationId = publicationIds.get(article.publication);

    const doc = {
      _type: "article",
      title: article.title,
      slug: { _type: "slug", current: article.slug },
      excerpt: article.excerpt,
      mainImage: mainImage
        ? {
            ...mainImage,
            alt: article.title,
          }
        : undefined,
      body,
      author: authorId
        ? { _type: "reference", _ref: authorId }
        : undefined,
      category: categoryId
        ? { _type: "reference", _ref: categoryId }
        : undefined,
      publication: publicationId
        ? { _type: "reference", _ref: publicationId }
        : undefined,
      publishedAt: new Date(article.publishedAt).toISOString(),
      featured: article.featured,
    };

    const result = await client.create(doc);
    console.log(`  ✅ Created: ${article.title} (${result._id})`);
  }
}

async function migrateIssues(): Promise<void> {
  console.log("\n📚 Migrating Magazine Issues...");

  for (const issue of mockIssues) {
    // Check if already exists
    const existingId = await documentExists("issue", issue.slug);
    if (existingId) {
      console.log(`  ⏭️  Skipping (exists): ${issue.title}`);
      continue;
    }

    console.log(`  📖 Processing: ${issue.title}`);

    // Upload cover image
    const coverImage = await uploadImageFromUrl(
      issue.coverImage,
      `issue-${issue.slug}.jpg`
    );

    // Get publication reference
    const publicationId = publicationIds.get(issue.publicationSlug);

    const doc = {
      _type: "issue",
      title: issue.title,
      slug: { _type: "slug", current: issue.slug },
      coverImage: coverImage
        ? {
            ...coverImage,
            alt: `${issue.title} Cover`,
          }
        : undefined,
      issuuEmbedUrl: issue.issuuEmbedUrl,
      publishedAt: new Date(issue.publishedAt).toISOString(),
      isCurrent: issue.isCurrent,
      publication: publicationId
        ? { _type: "reference", _ref: publicationId }
        : undefined,
    };

    const result = await client.create(doc);
    console.log(`  ✅ Created: ${issue.title} (${result._id})`);
  }
}

async function migrateEvents(): Promise<void> {
  console.log("\n📅 Migrating Events...");

  for (const event of mockEvents) {
    const slug = slugify(event.title);

    // Check if already exists
    const existingId = await documentExists("event", slug);
    if (existingId) {
      console.log(`  ⏭️  Skipping (exists): ${event.title}`);
      continue;
    }

    console.log(`  🎉 Processing: ${event.title}`);

    // Upload event image if exists
    let image = null;
    if (event.image) {
      image = await uploadImageFromUrl(event.image, `event-${slug}.jpg`);
    }

    const doc = {
      _type: "event",
      title: event.title,
      slug: { _type: "slug", current: slug },
      description: event.description,
      date: new Date(event.date).toISOString(),
      endDate: event.endDate ? new Date(event.endDate).toISOString() : undefined,
      location: event.location,
      link: event.link,
      image,
      category: event.category,
      recurring: "none",
      featured: false,
    };

    const result = await client.create(doc);
    console.log(`  ✅ Created: ${event.title} (${result._id})`);
  }
}

async function migratePublications(): Promise<void> {
  console.log("\n📚  Migrating Publications...");

  for (const publication of mockPublications) {
    // Check if already exists
    const existingId = await documentExists("publication", publication.slug);
    if (existingId) {
      console.log(`  ⏭️  Skipping (exists): ${publication.name}`);
      publicationIds.set(publication.slug, existingId);
      continue;
    }

    console.log(`  📍 Processing: ${publication.name}`);

    // Upload hero image
    const heroImage = await uploadImageFromUrl(
      publication.heroImage,
      `publication-${publication.slug}-hero.jpg`
    );

    // Process sections if they exist
    const sections = [];
    if (publication.sections) {
      for (let i = 0; i < publication.sections.length; i++) {
        const section = publication.sections[i];
        let sectionImage = null;

        if (section.image) {
          sectionImage = await uploadImageFromUrl(
            section.image,
            `publication-${publication.slug}-section-${i}.jpg`
          );
        }

        sections.push({
          _type: "publicationSection",
          _key: `section-${i}`,
          title: section.title,
          content: section.content,
          image: sectionImage,
        });
      }
    }

    const doc = {
      _type: "publication",
      name: publication.name,
      shortName: publication.shortName,
      slug: { _type: "slug", current: publication.slug },
      description: publication.description,
      heroImage: heroImage
        ? {
            ...heroImage,
            alt: publication.name,
          }
        : undefined,
      sections,
    };

    const result = await client.create(doc);
    publicationIds.set(publication.slug, result._id);
    console.log(`  ✅ Created: ${publication.name} (${result._id})`);
  }
}

// ============================================================================
// About Page Data
// ============================================================================

const aboutPageData = {
  heroTitle: "About Hill Country Sun",
  heroSubtitle: "For over three decades, we've been the voice of Wimberley and the River Region, telling the stories that matter to our community.",
  missionTitle: "Our Mission",
  missionContent: "To celebrate and preserve the unique character of the Texas Hill Country by telling the stories of the people, places, and traditions that make our region special.",
  storyTitle: "Our Story",
  storyContent: [
    "The Hill Country Sun was founded in 1990 with a simple mission: to connect the communities of Wimberley and the River Region through quality local journalism.",
    "What started as a small community newsletter has grown into the region's most trusted source for local news, events, and stories. We've watched Wimberley grow and change over the decades, and we've been proud to document that journey.",
    "Today, we continue that mission through our quarterly magazine, online articles, and community events calendar. We believe that local journalism matters—it's what keeps communities connected and informed."
  ],
  storyImageUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80",
  foundedYear: "1990",
  teamMembers: [
    {
      name: "Julie Harrington",
      role: "Publisher",
      email: "julie@hillcountrysun.com",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
      bio: "Julie has been at the helm of the Hill Country Sun for over 15 years, bringing her passion for local journalism and community connection to every issue.",
    },
    {
      name: "Melissa Ball",
      role: "Editor",
      email: "melissa@hillcountrysun.com",
      imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
      bio: "Melissa oversees all editorial content, ensuring each story captures the essence of Hill Country life while maintaining the highest standards of journalism.",
    },
  ],
  stats: [
    { value: "35+", label: "Years Serving" },
    { value: "50K+", label: "Monthly Readers" },
    { value: "400+", label: "Issues Published" },
  ],
};

async function migrateAboutPage(): Promise<void> {
  console.log("\n📄 Migrating About Page...");

  // Check if already exists
  const existing = await client.fetch(`*[_type == "aboutPage"][0]._id`);
  if (existing) {
    console.log(`  ⏭️  Skipping (exists): About Page`);
    return;
  }

  // Upload story image
  const storyImage = await uploadImageFromUrl(
    aboutPageData.storyImageUrl,
    "about-story.jpg"
  );

  // Upload team member images and build team array
  const teamMembers = [];
  for (let i = 0; i < aboutPageData.teamMembers.length; i++) {
    const member = aboutPageData.teamMembers[i];
    const memberImage = await uploadImageFromUrl(
      member.imageUrl,
      `team-${slugify(member.name)}.jpg`
    );

    teamMembers.push({
      _type: "object",
      _key: `team-${i}`,
      name: member.name,
      role: member.role,
      email: member.email,
      image: memberImage,
      bio: member.bio,
    });
  }

  // Build stats array
  const stats = aboutPageData.stats.map((stat, i) => ({
    _type: "object",
    _key: `stat-${i}`,
    value: stat.value,
    label: stat.label,
  }));

  // Convert story content to portable text
  const storyContentBlocks = aboutPageData.storyContent.map((paragraph, i) => ({
    _type: "block",
    _key: `block-${i}`,
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: `span-${i}`,
        text: paragraph,
        marks: [],
      },
    ],
  }));

  const missionContentBlocks = [
    {
      _type: "block",
      _key: "mission-0",
      style: "normal",
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: "mission-span-0",
          text: aboutPageData.missionContent,
          marks: [],
        },
      ],
    },
  ];

  const doc = {
    _id: "aboutPage", // Fixed ID for singleton
    _type: "aboutPage",
    heroTitle: aboutPageData.heroTitle,
    heroSubtitle: aboutPageData.heroSubtitle,
    missionTitle: aboutPageData.missionTitle,
    missionContent: missionContentBlocks,
    storyTitle: aboutPageData.storyTitle,
    storyContent: storyContentBlocks,
    storyImage: storyImage ? { ...storyImage, alt: "Our Story" } : undefined,
    foundedYear: aboutPageData.foundedYear,
    teamTitle: "Meet Our Team",
    teamSubtitle: "The dedicated journalists and editors who bring you the Hill Country Sun every quarter.",
    teamMembers,
    stats,
  };

  const result = await client.createOrReplace(doc);
  console.log(`  ✅ Created: About Page (${result._id})`);
}

// ============================================================================
// Home Page Data
// ============================================================================

const homePageData = {
  heroTagline: "Your Hill Country Connection",
  heroHeading: "Stories, Events & Life in the Texas Hill Country",
  heroDescription: "Covering Wimberley and the River Region since 1990. Discover local news, upcoming events, and the best of Hill Country living.",
  heroBackgroundImageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80",
  heroCtaPrimaryText: "Read Latest Issue",
  heroCtaSecondaryText: "Explore Articles",
  publicationsSectionTitle: "Explore Our Publications",
  publicationsSectionSubtitle: "In-depth resources to help you make the most of the Hill Country.",
};

async function migrateHomePage(): Promise<void> {
  console.log("\n🏠 Migrating Home Page...");

  // Check if already exists
  const existing = await client.fetch(`*[_type == "homePage"][0]._id`);
  if (existing) {
    console.log(`  ⏭️  Skipping (exists): Home Page`);
    return;
  }

  // Upload hero background image
  const heroBackgroundImage = await uploadImageFromUrl(
    homePageData.heroBackgroundImageUrl,
    "home-hero-background.jpg"
  );

  const doc = {
    _id: "homePage",
    _type: "homePage",
    heroTagline: homePageData.heroTagline,
    heroHeading: homePageData.heroHeading,
    heroDescription: homePageData.heroDescription,
    heroBackgroundImage: heroBackgroundImage ? { ...heroBackgroundImage, alt: "Texas Hill Country landscape" } : undefined,
    heroCtaPrimaryText: homePageData.heroCtaPrimaryText,
    heroCtaSecondaryText: homePageData.heroCtaSecondaryText,
    publicationsSectionTitle: homePageData.publicationsSectionTitle,
    publicationsSectionSubtitle: homePageData.publicationsSectionSubtitle,
  };

  const result = await client.createOrReplace(doc);
  console.log(`  ✅ Created: Home Page (${result._id})`);
}

// ============================================================================
// Team Members Data
// ============================================================================

const teamMembersData = [
  {
    name: "Julie Harrington",
    role: "Publisher",
    email: "julie@hillcountrysun.com",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    bio: "Julie has been at the helm of the Hill Country Sun for over 15 years, bringing her passion for local journalism and community connection to every issue.",
    order: 1,
  },
  {
    name: "Melissa Ball",
    role: "Editor",
    email: "melissa@hillcountrysun.com",
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    bio: "Melissa oversees all editorial content, ensuring each story captures the essence of Hill Country life while maintaining the highest standards of journalism.",
    order: 2,
  },
];

async function migrateTeamMembers(): Promise<void> {
  console.log("\n👥 Migrating Team Members...");

  for (const member of teamMembersData) {
    const slug = slugify(member.name);

    // Check if already exists (by name since teamMember doesn't have slug)
    const existing = await client.fetch(`*[_type == "teamMember" && name == $name][0]._id`, { name: member.name });
    if (existing) {
      console.log(`  ⏭️  Skipping (exists): ${member.name}`);
      continue;
    }

    console.log(`  👤 Processing: ${member.name}`);

    // Upload member image
    const memberImage = await uploadImageFromUrl(
      member.imageUrl,
      `team-member-${slug}.jpg`
    );

    const doc = {
      _type: "teamMember",
      name: member.name,
      role: member.role,
      email: member.email,
      image: memberImage,
      bio: member.bio,
      order: member.order,
    };

    const result = await client.create(doc);
    console.log(`  ✅ Created: ${member.name} (${result._id})`);
  }
}

// ============================================================================
// Contact Page Data
// ============================================================================

const contactPageData = {
  heroTitle: "Contact Us",
  heroSubtitle: "Have a question, story tip, event to submit, or want to advertise with us? We'd love to hear from you.",
  formTitle: "Send a Message",
  contactInfo: [
    { type: "email", label: "Email", value: "info@hillcountrysun.com", href: "mailto:info@hillcountrysun.com" },
    { type: "phone", label: "Phone", value: "(512) 847-5162", href: "tel:+15128475162" },
    { type: "location", label: "Location", value: "Wimberley, Texas" },
    { type: "hours", label: "Hours", value: "Mon-Fri: 9am - 5pm" },
  ],
  inquiryTypes: [
    { value: "general", label: "General Contact" },
    { value: "event", label: "Submit Event" },
    { value: "advertising", label: "Advertising Inquiry" },
    { value: "other", label: "Other" },
  ],
  successTitle: "Message Sent!",
  successMessage: "Thank you for reaching out. We'll get back to you as soon as possible.",
};

async function migrateContactPage(): Promise<void> {
  console.log("\n📧 Migrating Contact Page...");

  const contactInfo = contactPageData.contactInfo.map((item, i) => ({
    _type: "object",
    _key: `contact-${i}`,
    type: item.type,
    label: item.label,
    value: item.value,
    href: item.href,
  }));

  const inquiryTypes = contactPageData.inquiryTypes.map((item, i) => ({
    _type: "object",
    _key: `inquiry-${i}`,
    value: item.value,
    label: item.label,
  }));

  const doc = {
    _id: "contactPage",
    _type: "contactPage",
    heroTitle: contactPageData.heroTitle,
    heroSubtitle: contactPageData.heroSubtitle,
    formTitle: contactPageData.formTitle,
    contactInfo,
    inquiryTypes,
    successTitle: contactPageData.successTitle,
    successMessage: contactPageData.successMessage,
  };

  const result = await client.createOrReplace(doc);
  console.log(`  ✅ Created: Contact Page (${result._id})`);
}

// ============================================================================
// Site Settings Data
// ============================================================================

const siteSettingsData = {
  title: "Hill Country Sun",
  description: "Your source for local news, events, and stories from Wimberley and the Texas Hill Country region. Covering the River Region since 1990.",
  contact: {
    email: "info@hillcountrysun.com",
    phone: "(512) 847-5162",
    address: "Wimberley, Texas",
    hours: "Mon-Fri: 9am - 5pm",
  },
  footer: {
    tagline: "Your Hill Country Connection since 1990",
    copyrightText: "Hill Country Sun. All rights reserved.",
  },
  social: {
    facebook: "https://www.facebook.com/hillcountrysun",
    instagram: "https://www.instagram.com/hillcountrysun",
  },
  publisher: {
    name: "Linda Lee",
    email: "publisher@hillcountrysun.com",
  },
  editor: {
    name: "Cynthia Miller",
    email: "editor@hillcountrysun.com",
  },
  advertisingEmail: "advertising@hillcountrysun.com",
  foundedYear: 1990,
};

async function migrateSiteSettings(): Promise<void> {
  console.log("\n⚙️  Migrating Site Settings...");

  const doc = {
    _id: "siteSettings",
    _type: "siteSettings",
    title: siteSettingsData.title,
    description: siteSettingsData.description,
    contact: siteSettingsData.contact,
    footer: siteSettingsData.footer,
    social: siteSettingsData.social,
    publisher: siteSettingsData.publisher,
    editor: siteSettingsData.editor,
    advertisingEmail: siteSettingsData.advertisingEmail,
    foundedYear: siteSettingsData.foundedYear,
  };

  const result = await client.createOrReplace(doc);
  console.log(`  ✅ Created: Site Settings (${result._id})`);
}

// ============================================================================
// Legal Pages Data
// ============================================================================

const legalPagesData = [
  {
    title: "Privacy Policy",
    slug: "privacy",
    lastUpdated: "2024-01-15",
    content: [
      "Hill Country Sun is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our services.",
      "Information We Collect: We may collect personal information you provide directly to us, such as your name, email address, and phone number when you subscribe to our newsletter, submit a contact form, or interact with our services.",
      "How We Use Your Information: We use the information we collect to provide, maintain, and improve our services, send you updates and marketing communications (with your consent), and respond to your inquiries.",
      "Information Sharing: We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as required by law or to protect our rights.",
      "Contact Us: If you have questions about this Privacy Policy, please contact us at info@hillcountrysun.com.",
    ],
  },
  {
    title: "Terms of Service",
    slug: "terms",
    lastUpdated: "2024-01-15",
    content: [
      "Welcome to Hill Country Sun. By accessing or using our website and services, you agree to be bound by these Terms of Service.",
      "Use of Content: All content on this website, including articles, photographs, and graphics, is protected by copyright. You may not reproduce, distribute, or create derivative works without our express written permission.",
      "User Conduct: You agree not to use our website for any unlawful purpose or in any way that could damage, disable, or impair the website.",
      "Disclaimer: The information provided on this website is for general informational purposes only. We make no warranties about the accuracy or completeness of the information.",
      "Limitation of Liability: Hill Country Sun shall not be liable for any damages arising from your use of or inability to use our website or services.",
      "Changes to Terms: We reserve the right to modify these terms at any time. Continued use of the website constitutes acceptance of any changes.",
      "Contact Us: If you have questions about these Terms, please contact us at info@hillcountrysun.com.",
    ],
  },
];

async function migrateLegalPages(): Promise<void> {
  console.log("\n📜 Migrating Legal Pages...");

  for (const page of legalPagesData) {
    // Check if already exists
    const existingId = await documentExists("page", page.slug);
    if (existingId) {
      console.log(`  ⏭️  Skipping (exists): ${page.title}`);
      continue;
    }

    // Convert content paragraphs to portable text
    const contentBlocks = page.content.map((paragraph, i) => ({
      _type: "block",
      _key: `block-${i}`,
      style: "normal",
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: `span-${i}`,
          text: paragraph,
          marks: [],
        },
      ],
    }));

    const doc = {
      _type: "page",
      title: page.title,
      slug: { _type: "slug", current: page.slug },
      lastUpdated: page.lastUpdated,
      content: contentBlocks,
    };

    const result = await client.create(doc);
    console.log(`  ✅ Created: ${page.title} (${result._id})`);
  }
}

// ============================================================================
// Main
// ============================================================================

async function main() {
  console.log("🚀 Starting migration to Sanity...");
  console.log(`   Project: ${PROJECT_ID}`);
  console.log(`   Dataset: ${DATASET}`);

  try {
    // Migrate in order of dependencies
    // Publications FIRST so articles and issues can reference them
    await migratePublications();
    await migrateAuthors();
    await migrateCategories();
    await migrateArticles();
    await migrateIssues();
    await migrateEvents();
    await migrateAboutPage();
    await migrateHomePage();
    await migrateTeamMembers();
    await migrateContactPage();
    await migrateSiteSettings();
    await migrateLegalPages();

    console.log("\n✅ Migration complete!");
    console.log("\nSummary:");
    console.log(`  - Publications: ${publicationIds.size}`);
    console.log(`  - Authors: ${authorIds.size}`);
    console.log(`  - Categories: ${categoryIds.size}`);
    console.log(`  - Articles: ${mockArticles.length}`);
    console.log(`  - Issues: ${mockIssues.length}`);
    console.log(`  - Events: ${mockEvents.length}`);
    console.log(`  - About Page: 1`);
    console.log(`  - Home Page: 1`);
    console.log(`  - Team Members: ${teamMembersData.length}`);
    console.log(`  - Contact Page: 1`);
    console.log(`  - Site Settings: 1`);
    console.log(`  - Legal Pages: ${legalPagesData.length}`);
  } catch (error) {
    console.error("\n❌ Migration failed:", error);
    process.exit(1);
  }
}

main();
