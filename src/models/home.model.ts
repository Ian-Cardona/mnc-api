import type { Document } from 'mongoose';
import { Schema, model } from 'mongoose';
import type { IHero, IHome, ITestimonial } from '../types/home.types';

export interface IHomeDocument extends IHome ,Document {};

const heroDbSchema = new Schema<IHero>(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    cta: { type: String, required: true },
  },
  { _id: false },
);

const testimonialDbSchema = new Schema<ITestimonial>(
  {
    testifier: { type: String, required: true },
    company: { type: String, required: true },
    message: { type: String, required: true },
  },
  { _id: false },
);

const servicesOfferedItemDbSchema = new Schema(
  {
    description: { type: String, required: true },
  },
  { _id: false },
);

const servicesOfferedDbSchema = new Schema(
  {
    title: { type: String, required: true },
    items: { type: [servicesOfferedItemDbSchema], required: true },
  },
  { _id: false },
);

const homeDbSchema = new Schema<IHomeDocument>({
  hero: { type: heroDbSchema, required: true },
  servicesHeader: { type: String, required: true },
  servicesDescription: { type: String, required: true },
  testimonialsHeader: { type: String, required: true },
  testimonialsDescription: { type: String, required: true },
  testimonials: { type: [testimonialDbSchema], required: true },
  services: { type: [servicesOfferedDbSchema], required: true },
});

export const HomeModel = model<IHomeDocument>('Home', homeDbSchema);
