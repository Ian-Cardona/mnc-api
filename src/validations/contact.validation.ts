import { z } from 'zod';

export const businessHoursZodSchema = z.object({
  day: z.string(),
  hours: z.string(),
});

export const contactSocialsZodSchema = z.object({
  facebook: z.string(),
  linkedin: z.string(),
});

export const contactInfoZodSchema = z.object({
  phone: z.string(),
  email: z.string(),
  address: z.string(),
});

export const contactHeroZodSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
});

export const contactZodSchema = z.object({
  hero: contactHeroZodSchema,
  contactInfo: contactInfoZodSchema,
  socials: contactSocialsZodSchema,
  businessHours: businessHoursZodSchema,
});

export default contactZodSchema;
