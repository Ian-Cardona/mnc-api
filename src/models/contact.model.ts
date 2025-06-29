import { Schema, model, type Document } from 'mongoose';
import type { IBusinessHours, IContact, IContactHero, IContactInfo, IContactSocials } from '../types/contact.type';

export interface IContactDocument extends IContact, Document {}

const contactHeroDbSchema = new Schema<IContactHero>(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
  },
  { _id: false },
);

const contactInfoDbSchema = new Schema<IContactInfo>(
  {
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
  },
  { _id: false },
);

const contactSocialsDbSchema = new Schema<IContactSocials>(
  {
    facebook: { type: String, required: true },
    linkedin: { type: String, required: true },
  },
  { _id: false },
);

const businessHoursDbSchema = new Schema<IBusinessHours>(
  {
    day: { type: String, required: true },
    hours: { type: String, required: true },
  },
  { _id: false },
);

const contactDbSchema = new Schema<IContactDocument>({
  hero: { type: contactHeroDbSchema, required: true },
  contactInfo: { type: contactInfoDbSchema, required: true },
  socials: { type: contactSocialsDbSchema, required: true },
  businessHours: { type: [businessHoursDbSchema], required: true },
});

export const ContactModel = model<IContactDocument>('Contact', contactDbSchema);
