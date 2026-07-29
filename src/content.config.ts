import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    featured: z.boolean().default(false),
    status: z.enum(['Completed', 'In progress', 'Planned']).default('Completed'),
    technologies: z.array(z.string()),
    repository: z.string().url().optional(),
    demo: z.string().url().optional(),
    image: z.string().optional(),
  }),
});

export const collections = { projects };
