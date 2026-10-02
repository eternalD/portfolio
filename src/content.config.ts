import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const caseStudiesCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/case-studies' }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    summary: z.string(),
    order: z.number().default(0),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = {
  'case-studies': caseStudiesCollection,
};
