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
  mockGuides,
  type Article,
  type MagazineIssue,
  type Event,
  type Guide,
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

async function migrateGuides(): Promise<void> {
  console.log("\n🗺️  Migrating Guides...");

  const guides = Object.values(mockGuides);

  for (const guide of guides) {
    // Check if already exists
    const existingId = await documentExists("guide", guide.slug);
    if (existingId) {
      console.log(`  ⏭️  Skipping (exists): ${guide.title}`);
      continue;
    }

    console.log(`  📍 Processing: ${guide.title}`);

    // Upload hero image
    const heroImage = await uploadImageFromUrl(
      guide.heroImage,
      `guide-${guide.slug}-hero.jpg`
    );

    // Process sections
    const sections = [];
    for (let i = 0; i < guide.sections.length; i++) {
      const section = guide.sections[i];
      let sectionImage = null;

      if (section.image) {
        sectionImage = await uploadImageFromUrl(
          section.image,
          `guide-${guide.slug}-section-${i}.jpg`
        );
      }

      sections.push({
        _type: "guideSection",
        _key: `section-${i}`,
        title: section.title,
        content: section.content,
        image: sectionImage,
      });
    }

    const doc = {
      _type: "guide",
      title: guide.title,
      slug: { _type: "slug", current: guide.slug },
      heroImage: heroImage
        ? {
            ...heroImage,
            alt: guide.title,
          }
        : undefined,
      intro: guide.intro,
      sections,
    };

    const result = await client.create(doc);
    console.log(`  ✅ Created: ${guide.title} (${result._id})`);
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
    await migrateAuthors();
    await migrateCategories();
    await migrateArticles();
    await migrateIssues();
    await migrateEvents();
    await migrateGuides();

    console.log("\n✅ Migration complete!");
    console.log("\nSummary:");
    console.log(`  - Authors: ${authorIds.size}`);
    console.log(`  - Categories: ${categoryIds.size}`);
    console.log(`  - Articles: ${mockArticles.length}`);
    console.log(`  - Issues: ${mockIssues.length}`);
    console.log(`  - Events: ${mockEvents.length}`);
    console.log(`  - Guides: ${Object.keys(mockGuides).length}`);
  } catch (error) {
    console.error("\n❌ Migration failed:", error);
    process.exit(1);
  }
}

main();
