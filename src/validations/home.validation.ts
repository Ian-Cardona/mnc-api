import { z } from 'zod';

const heroZodSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  cta: z.string(),
});

const testimonialZodSchema = z.object({
  testifier: z.string(),
  company: z.string(),
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
  hero: heroZodSchema,
  servicesHeader: z.string(),
  servicesDescription: z.string(),
  testimonialsHeader: z.string(),
  testimonialsDescription: z.string(),
  testimonials: z.array(testimonialZodSchema).min(1, 'At least one testimonial is required'),
  services: z.array(servicesOfferedZodSchema),
});

export default homeZodSchema;
