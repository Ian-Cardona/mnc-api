import { Schema, model, Document } from "mongoose";

export type Platform = 'facebook' | 'instagram' | 'linkedin';

export interface ISocial {
  platform: Platform;
  url: string;
}

export interface IFooterLink {
  label: string;
  path: string;
  external?: boolean;
}

export interface IFooter extends Document {
  copyright: string;
  address: string;
  socials: ISocial[];
  links: IFooterLink[];
}

const socialSchema = new Schema<ISocial>(
  {
    platform: { type: String, required: true },
    url: { type: String, required: true },
  },
  { _id: false }
);

const footerLinkSchema = new Schema<IFooterLink>(
  {
    label: { type: String, required: true },
    path: { type: String, required: true },
    external: { type: Boolean, default: false },
  },
  { _id: false }
);

const footerSchema = new Schema<IFooter>({
  copyright: { type: String, required: true },
  address: { type: String, required: true },
  socials: { type: [socialSchema], required: true },
  links: { type: [footerLinkSchema], required: true },
});

export const Footer = model<IFooter>("Footer", footerSchema);