import { z } from 'zod';

export const guidesHeroZodSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
});

export const guidesFormLinksZodSchema = z.object({
  name: z.string(),
  url: z.string(),
  description: z.string(),
});

const guidesZodSchema = z.object({
  hero: guidesHeroZodSchema,
  forms: z.array(guidesFormLinksZodSchema),
  cta: z.string(),
});

export default guidesZodSchema;
