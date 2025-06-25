import { z } from 'zod';

export const navbarLinkZodSchema = z.object({
  label: z.string(),
  path: z.string(),
  external: z.boolean().optional(),
});

export const navbarZodSchema = z.object({
  links: z.array(navbarLinkZodSchema),
  cta: z.object({
    label: z.string(),
    url: z.string(),
    external: z.boolean().optional(),
  }).optional(),
});


export default navbarZodSchema;
