import { Schema, model, Document } from "mongoose";

export interface ITestimonial {
  testifier: string;
  title: string;
  message: string;
}

export interface IHome extends Document {
  cta: string;
  heroTitle: string;
  heroContent: string;
  testimonials: ITestimonial[];
}

const testimonialSchema = new Schema<ITestimonial>(
  {
    testifier: { type: String, required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
  },
  { _id: false }
);

const homeSchema = new Schema<IHome>({
  cta: { type: String, required: true },
  heroTitle: { type: String, required: true },
  heroContent: { type: String, required: true },
  testimonials: { type: [testimonialSchema], required: true },
});

export const Home = model<IHome>("Home", homeSchema);