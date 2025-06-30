import type { Document } from 'mongoose';
import { Schema, model } from 'mongoose';
import type { IGuides, IGuidesHero } from '../types/guides.type';

export interface IGuidesDocument extends IGuides, Document {};

const guidesHeroDbSchema = new Schema<IGuidesHero>(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
  },
  { _id: false },
);

const guidesFormLinksDbSchema = new Schema(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
    description: { type: String, required: true },
  },
  { _id: false },
);

const guidesDbSchema = new Schema<IGuidesDocument>({
  hero: { type: guidesHeroDbSchema, required: true },
  forms: { type: [guidesFormLinksDbSchema], required: true },
  cta: { type: String, required: true },
});

export const GuidesModel = model<IGuidesDocument>('Guides', guidesDbSchema);
