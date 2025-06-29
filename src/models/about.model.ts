import { Schema, model, type Document } from 'mongoose';
import type { IAbout, IAboutApproach, IAboutHero, IAboutHighlight, IAboutStat, IAboutStory, IAboutTeamMember, IAboutValue } from '../types/about.type';

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

const aboutValueDbSchema = new Schema<IAboutValue>({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
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
});

const aboutDbSchema = new Schema<IAboutDocument>({
  hero: { type: aboutHeroDbSchema, required: true },
  story: { type: aboutStoryDbSchema, required: true },
  values: { type: [aboutValueDbSchema], required: true },
  approach: { type: aboutApproachDbSchema, required: true },
  team: { type: [aboutTeamMemberDbSchema], required: true },
  stats: { type: [aboutStatDbSchema], required: true },
});

export const AboutModel = model<IAboutDocument>('About', aboutDbSchema);
