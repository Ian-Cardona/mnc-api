import { z } from 'zod';

export const platformEnum = z.enum(['facebook', 'instagram', 'linkedin']);

export type Platform = z.infer<typeof platformEnum>;

export interface ISocial {
  platform: Platform;
  url: string;
}

export interface IFooterLink {
  label: string;
  path: string;
  external?: boolean;
}

export interface IFooter {
  copyright: string;
  address: string;
  socials: ISocial[];
  links: IFooterLink[];
}