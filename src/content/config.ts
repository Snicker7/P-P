import { defineCollection, z } from 'astro:content';

const settingsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    siteTitle: z.string(),
    seoDescription: z.string().max(160),
    inquiryEmail: z.string().email(),
    inquiryPhone: z.string().optional(),
    serviceArea: z.string(),
    instagram: z.string(),
    pinterest: z.string().optional(),
    tiktok: z.string().optional(),
    bookingBanner: z.string(),
    defaultOgImage: z.string().default('/og-default.png'),
  }),
});

const pagesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().max(60).optional(),
    seoDescription: z.string().max(160).optional(),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
  }).passthrough(),
});

const portfolioCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    eventTitle: z.string(),
    eventType: z.enum(['Wedding', 'Event', 'Editorial', 'Installation']).default('Wedding'),
    eventDate: z.date(),
    venue: z.string().optional(),
    location: z.string().optional(),
    heroImage: image(),
    heroImageAlt: z.string(),
    gallery: z.array(z.object({
      image: image(),
      caption: z.string().optional(),
      alt: z.string(),
    })).default([]),
    credits: z.array(z.object({
      role: z.string(),
      name: z.string(),
      instagram: z.string().optional(),
    })).default([]),
    featured: z.boolean().default(false),
    published: z.boolean().default(false),
    seoTitle: z.string().max(60).optional(),
    seoDescription: z.string().max(160).optional(),
  }),
});

const journalCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.date(),
    heroImage: image().or(z.string()),
    heroImageAlt: z.string(),
    excerpt: z.string().max(220),
    tags: z.array(z.string()).default([]),
    published: z.boolean().default(true),
    seoTitle: z.string().max(60).optional(),
    seoDescription: z.string().max(160).optional(),
  }),
});

export const collections = {
  settings: settingsCollection,
  pages: pagesCollection,
  portfolio: portfolioCollection,
  journal: journalCollection,
};
