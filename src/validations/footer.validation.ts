import { z } from 'zod';
import { platformEnum } from '../types/footer.types';
import { navbarLinkZodSchema } from './navbar.validation';

export const socialZodSchema = z.object({
  platform: platformEnum,
  url: z.string(),
});

export const formZodSchema = z.object({
  header: z.string(),
  subheader: z.string(),
});

export const infoZodSchema = z.object({
  address: z.string(),
  contact: z.string(),
  email: z.string(),
});

export const footerZodSchema = z.object({
  form: formZodSchema,
  info: infoZodSchema,
  copyright: z.string(),
  socials: z.array(socialZodSchema).min(1, 'At least one social link is required'),
  links: z.array(navbarLinkZodSchema),
});

export default footerZodSchema;
