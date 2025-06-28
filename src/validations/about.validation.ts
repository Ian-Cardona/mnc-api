import { z } from 'zod';

export const aboutHeroZodSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
});

export const aboutHighlightZodSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string(),
});

export const aboutLocationZodSchema = z.object({
  title: z.string(),
  address: z.string(),
});


export const aboutTeamMemberZodSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  icon: z.string(),
  tags: z.array(z.string()),
  order: z.number(),
});

export const aboutApproachZodSchema = z.object({
  title: z.string(),
  description: z.string(),
  members: z.array(aboutTeamMemberZodSchema),
});

export const aboutValueZodSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  icon: z.string(),
  order: z.number(),
});


export const aboutStatZodSchema = z.object({
  id: z.string(),
  value: z.string(),
  label: z.string(),
  order: z.number(),
});

export const aboutStoryZodSchema = z.object({
  title: z.string(),
  paragraphs: z.array(z.string()),
  highlight: aboutHighlightZodSchema.optional(),
});

export const aboutContactZodSchema = z.object({
  title: z.string(),
  description: z.string(),
  ctaText: z.string(),
  ctaIcon: z.string(),
});

export const aboutZodSchema = z.object({
  hero: aboutHeroZodSchema,
  story: aboutStoryZodSchema,
  location: aboutLocationZodSchema,
  values: z.array(aboutValueZodSchema),
  approach: aboutApproachZodSchema,
  team: z.array(aboutTeamMemberZodSchema),
  stats: z.array(aboutStatZodSchema),
  contact: aboutContactZodSchema,
});

export default aboutZodSchema;
