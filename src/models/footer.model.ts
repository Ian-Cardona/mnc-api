import type { Document } from 'mongoose';
import { Schema, model } from 'mongoose';
import type { IFooter, IFooterForm, IFooterFormInput, IFooterInfo, IFooterSocial } from '../types/footer.type';
import { navBarLinkSchema } from './navbar.model';

export interface IFooterDocument extends IFooter, Document {}

const formDbSchema = new Schema<IFooterForm>(
  {
    header: { type: String, required: true },
    subheader: { type: String, required: true },
  },
  { _id: false },
);

const socialDbSchema = new Schema<IFooterSocial>(
  {
    platform: { type: String, required: true },
    url: { type: String, required: true },
  },
  { _id: false },
);

const infoDbSchema = new Schema<IFooterInfo>(
  {
    address: { type: String, required: true },
    contact: { type: String, required: true },
    email: { type: String, required: true },
  },
  { _id: false },
);

const footerDbSchema = new Schema<IFooterDocument>({
  form: { type: formDbSchema, required: true },
  socials: { type: [socialDbSchema], required: true },
  info: { type: infoDbSchema, required: true },
  copyright: { type: String, required: true },
  links: { type: [navBarLinkSchema], required: true },
});

const formInputDbSchema = new Schema<IFooterFormInput>(
  {
    emailer: { type: String, required: true },
    contact: { type: String, required: true },
    message: { type: String, required: true },
  },
  { _id: false },
);

export const FooterModel = model<IFooterDocument>('Footer', footerDbSchema);
export const FormInputModel = model<IFooterFormInput>('FormInput', formInputDbSchema);
