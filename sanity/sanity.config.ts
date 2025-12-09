import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import { structure } from './structure';
import { Logo } from './components/Logo';

export default defineConfig({
  name: 'default',
  title: 'Hill Country Sun',

  projectId: 'v33ykncb',
  dataset: 'production',

  // Custom branding
  icon: Logo,

  plugins: [
    structureTool({
      structure,
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
