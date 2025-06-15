import { Schema, model, Document } from "mongoose";

export interface IHome extends Document {
  cta: string;
  heroTitle: string;
  heroContent: string;
}

const homeSchema = new Schema<IHome>({
  cta: { type: String, required: true },
  heroTitle: { type: String, required: true },
  heroContent: { type: String, required: true },
});

export const Home = model<IHome>("Home", homeSchema);