import { z } from 'zod';
import { platformEnum } from '../types/footer.types';

export const socialZodSchema = z.object({
  platform: platformEnum,
  url: z.string(),
});

export const footerLinkZodSchema = z.object({
  label: z.string(),
  path: z.string(),
  external: z.boolean().optional(),
});

export const footerZodSchema = z.object({
  copyright: z.string(),
  address: z.string(),
  socials: z.array(socialZodSchema),
  links: z.array(footerLinkZodSchema),
});


export default footerZodSchema;

// TODO: Use validations now
