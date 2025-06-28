import { Schema, model, type Document } from 'mongoose';
import type { IAbout, IAboutApproach, IAboutContact, IAboutHero, IAboutHighlight, IAboutLocation, IAboutStat, IAboutStory, IAboutTeamMember, IAboutValue } from '../types/about.types';

export interface IAboutDocument extends IAbout, Document {}

const aboutHighlightDbSchema = new Schema<IAboutHighlight>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: false, default: '' },
});

const aboutTeamMemberDbSchema = new Schema<IAboutTeamMember>({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  tags: { type: [String], required: true },
  order: { type: Number, required: true },
});

const aboutHeroDbSchema = new Schema<IAboutHero>({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
});

const aboutStoryDbSchema = new Schema<IAboutStory>({
  title: { type: String, required: true },
  paragraphs: { type: [String], required: true },
  highlight: { type: aboutHighlightDbSchema, required: false, default: {} },
});

const aboutLocationDbSchema = new Schema<IAboutLocation>({
  title: { type: String, required: true },
  address: { type: String, required: true },
});

const aboutValueDbSchema = new Schema<IAboutValue>({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  order: { type: Number, required: true },
});

const aboutApproachDbSchema = new Schema<IAboutApproach>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  members: { type: [aboutTeamMemberDbSchema], required: true },
});

const aboutStatDbSchema = new Schema<IAboutStat>({
  id: { type: String, required: true },
  value: { type: String, required: true },
  label: { type: String, required: true },
  order: { type: Number, required: true },
});

const aboutContactDbSchema = new Schema<IAboutContact>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  ctaText: { type: String, required: false, default: '' },
  ctaIcon: { type: String, required: false, default: '' },
});

const aboutDbSchema = new Schema<IAboutDocument>({
  hero: { type: aboutHeroDbSchema, required: true },
  story: { type: aboutStoryDbSchema, required: true },
  location: { type: aboutLocationDbSchema, required: true },
  values: { type: [aboutValueDbSchema], required: true },
  approach: { type: aboutApproachDbSchema, required: true },
  team: { type: [aboutTeamMemberDbSchema], required: true },
  stats: { type: [aboutStatDbSchema], required: true },
  contact: { type: aboutContactDbSchema, required: true },
});

export const AboutModel = model<IAboutDocument>('About', aboutDbSchema);
