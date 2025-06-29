import type { Document } from 'mongoose';
import { Schema, model } from 'mongoose';
import type { INavBar, INavBarLink, INavBarCTA } from '../types/navbar.type';

export interface INavBarDocument extends INavBar, Document {}

export const navBarLinkSchema = new Schema<INavBarLink>({
  label: { type: String, required: true },
  path: { type: String, required: true },
  external: { type: Boolean, default: false },
}, { _id: false });

const navBarCtaSchema = new Schema<INavBarCTA>({
  label: { type: String, required: true },
  url: { type: String, required: true },
  external: { type: Boolean, default: false },
}, { _id: false });

const navBarSchema = new Schema<INavBarDocument>({
  links: { type: [navBarLinkSchema], required: true },
  cta: { type: navBarCtaSchema, required: false },
});

export const NavBarModel = model<INavBarDocument>('NavBar', navBarSchema);
