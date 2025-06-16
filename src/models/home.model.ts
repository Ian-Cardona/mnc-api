import { Schema, model, Document } from "mongoose";

interface ITestimonials extends Document {
  testifier: string;
  title: string;
  message: string;
}

export interface IHome extends Document {
  cta: string;
  heroTitle: string;
  heroContent: string;
  testimonial: ITestimonials;
}

const homeSchema = new Schema<IHome>({
  cta: { type: String, required: true },
  heroTitle: { type: String, required: true },
  heroContent: { type: String, required: true },
  testimonial: { type: Array<ITestimonials>, required: true},
});

export const Home = model<IHome>("Home", homeSchema);