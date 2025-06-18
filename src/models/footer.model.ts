import { Schema, model, Document } from 'mongoose';
import { IFooter, IFooterLink, ISocial } from '../types/footer.types';

export interface IFooterDocument extends IFooter, Document {}

const socialSchema = new Schema<ISocial>(
  {
    platform: { type: String, required: true },
    url: { type: String, required: true },
  },
  { _id: false }
);

const footerLinkDbSchema = new Schema<IFooterLink>(
  {
    label: { type: String, required: true },
    path: { type: String, required: true },
    external: { type: Boolean, default: false },
  },
  { _id: false }
);

const footerDbSchema = new Schema<IFooterDocument>({
  copyright: { type: String, required: true },
  address: { type: String, required: true },
  socials: { type: [socialSchema], required: true },
  links: { type: [footerLinkDbSchema], required: true },
});

export const FooterModel = model<IFooterDocument>('Footer', footerDbSchema);