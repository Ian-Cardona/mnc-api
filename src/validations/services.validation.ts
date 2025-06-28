import { z } from 'zod';

const servicesHeroZodSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  description: z.string(),
  additionalInfo: z.string(),
});

const servicesListZodSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string(),
  image: z.string(),
  color: z.string(),
});

const whyChooseUsZodSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string(),
});

const servicesCTAZodSchema = z.object({
  title: z.string(),
  description: z.string(),
  buttonText: z.string(),
});

const servicesZodSchema = z.object({
  hero: servicesHeroZodSchema,
  whyChooseUs: z.array(whyChooseUsZodSchema),
  services: z.array(servicesListZodSchema),
  cta: servicesCTAZodSchema,
});

export default servicesZodSchema;
