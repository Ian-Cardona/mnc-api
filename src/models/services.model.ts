import type { Document } from 'mongoose';
import { Schema, model } from 'mongoose';
import type { IServiceList, IServices, IServicesCTA, IServicesHero, IWhyChooseUsItem } from '../types/services.type';

export interface IServicesDocument extends IServices, Document {}

export const servicesHeroSchema = new Schema<IServicesHero>({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
  additionalInfo: { type: String, required: true },
}, { _id: false });

const whyChooseUsSchema = new Schema<IWhyChooseUsItem>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
}, { _id: false });

const servicesListSchema = new Schema<IServiceList>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  image: { type: String, required: true },
  color: { type: String, required: true },
}, { _id: false });

const servicesCTASchema = new Schema<IServicesCTA>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  buttonText: { type: String, required: true },
}, { _id: false });

const servicesDBSchema = new Schema<IServicesDocument>({
  hero: { type: servicesHeroSchema, required: true },
  whyChooseUs: { type: [whyChooseUsSchema], required: true },
  services: { type: [servicesListSchema], required: true },
  cta: { type: servicesCTASchema, required: false },
});

export const ServicesModel = model<IServicesDocument>('Services', servicesDBSchema);
