import { z } from 'zod';

const testimonialZodSchema = z.object({
  testifier: z.string(),
  title: z.string(),
  message: z.string(),
});

const servicesOfferedItemZodSchema = z.object({
  description: z.string(),
});

const servicesOfferedZodSchema = z.object({
  title: z.string(),
  items: z.array(servicesOfferedItemZodSchema),
});

const homeZodSchema = z.object({
  cta: z.string(),
  heroTitle: z.string(),
  heroContent: z.string(),
  testimonials: z.array(testimonialZodSchema),
  services: z.array(servicesOfferedZodSchema),
});

export default homeZodSchema;
