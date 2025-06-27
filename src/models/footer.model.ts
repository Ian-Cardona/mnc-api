import type { Document } from 'mongoose';
import { Schema, model } from 'mongoose';
import type { IFooter, IFooterForm, IFooterFormInput, IFooterInfo, IFooterSocial } from '../types/footer.types';
import { navBarLinkSchema } from './navbar.model';

export interface IFooterDocument extends IFooter, Document {}

const formSchema = new Schema<IFooterForm>(
  {
    header: { type: String, required: true },
    subheader: { type: String, required: true },
  },
  { _id: false },
);

const socialSchema = new Schema<IFooterSocial>(
  {
    platform: { type: String, required: true },
    url: { type: String, required: true },
  },
  { _id: false },
);

const infoSchema = new Schema<IFooterInfo>(
  {
    address: { type: String, required: true },
    contact: { type: String, required: true },
    email: { type: String, required: true },
  },
  { _id: false },
);

const footerDbSchema = new Schema<IFooterDocument>({
  form: { type: formSchema, required: true },
  socials: { type: [socialSchema], required: true },
  info: { type: infoSchema, required: true },
  copyright: { type: String, required: true },
  links: { type: [navBarLinkSchema], required: true },
});

const formInputSchema = new Schema<IFooterFormInput>(
  {
    emailer: { type: String, required: true },
    contact: { type: String, required: true },
    message: { type: String, required: true },
  },
  { _id: false },
);

export const FooterModel = model<IFooterDocument>('Footer', footerDbSchema);
export const FormInputModel = model<IFooterFormInput>('FormInput', formInputSchema);
