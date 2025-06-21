import type { Document } from 'mongoose';
import { Schema, model } from 'mongoose';
import type { IHome, ITestimonial } from '../types/home.types';

export interface IHomeDocument extends IHome ,Document {};

const testimonialDbSchema = new Schema<ITestimonial>(
  {
    testifier: { type: String, required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
  },
  { _id: false },
);

const homeDbSchema = new Schema<IHomeDocument>({
  cta: { type: String, required: true },
  heroTitle: { type: String, required: true },
  heroContent: { type: String, required: true },
  testimonials: { type: [testimonialDbSchema], required: true },
});

export const HomeModel = model<IHomeDocument>('Home', homeDbSchema);
