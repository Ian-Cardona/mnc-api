import { Schema, model, Document } from "mongoose";

export interface IFooter extends Document {
  address: string;
}

const footerSchema = new Schema<IFooter>({
  address: { type: String, required: true },
});

export const Footer = model<IFooter>("Footer", footerSchema);