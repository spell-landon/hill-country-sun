/**
 * Script to delete all content from Sanity CMS
 *
 * Usage:
 *   SANITY_API_TOKEN=your-token npm run sanity:delete-all
 *
 * This will delete all documents of the specified types.
 * System documents (starting with "_") are preserved.
 */

import { createClient } from "@sanity/client";

const PROJECT_ID = process.env.SANITY_PROJECT_ID || "v33ykncb";
const DATASET = process.env.SANITY_DATASET || "production";
const API_TOKEN = process.env.SANITY_API_TOKEN;

if (!API_TOKEN) {
  console.error("Error: SANITY_API_TOKEN environment variable is required");
  console.error("Get a token from: https://sanity.io/manage → Your Project → API → Tokens");
  process.exit(1);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  token: API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const DOCUMENT_TYPES = [
  "article",
  "issue",
  "publication",
  "event",
  "author",
  "category",
  "aboutPage",
  "contactPage",
  "siteSettings",
  "page",
];

async function deleteAllData() {
  console.log("🗑️  Deleting all Sanity content...\n");

  for (const type of DOCUMENT_TYPES) {
    const query = `*[_type == "${type}"]{ _id }`;
    const documents = await client.fetch(query);

    if (documents.length === 0) {
      console.log(`   ${type}: No documents found`);
      continue;
    }

    console.log(`   ${type}: Deleting ${documents.length} documents...`);

    const transaction = client.transaction();
    for (const doc of documents) {
      transaction.delete(doc._id);
    }
    await transaction.commit();

    console.log(`   ${type}: ✓ Deleted`);
  }

  console.log("\n✅ All content deleted successfully!");
  console.log("   You can now run: SANITY_API_TOKEN=your-token npm run sanity:migrate");
}

deleteAllData().catch((error) => {
  console.error("Error deleting data:", error);
  process.exit(1);
});
