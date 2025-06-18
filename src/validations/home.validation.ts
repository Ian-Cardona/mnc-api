import { z } from 'zod';

const testimonialZodSchema = z.object({
  testifier: z.string(),
  title: z.string(),
  message: z.string(),
});

const homeZodSchema = z.object({
  cta: z.string(),
  heroTitle: z.string(),
  heroContent: z.string(),
  testimonials: z.array(testimonialZodSchema),
});

export default homeZodSchema;