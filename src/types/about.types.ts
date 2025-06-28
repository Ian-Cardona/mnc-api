export interface IAbout {
  hero: IAboutHero;
  story: IAboutStory;
  location: IAboutLocation;
  values: IAboutValue[];
  approach: IAboutApproach;
  team: IAboutTeamMember[];
  stats: IAboutStat[];
  contact: IAboutContact;
}

export interface IAboutHero {
  title: string;
  subtitle: string;
}

export interface IAboutStory {
  title: string;
  paragraphs: string[];
  highlight?: IAboutHighlight;
}

export interface IAboutLocation {
  title: string;
  address: string;
}

export interface IAboutContact {
  title: string;
  description: string;
  ctaText?: string;
  ctaIcon?: string;
}

export interface IAboutHighlight {
  title: string;
  description: string;
  icon?: string;
}

export interface IAboutValue {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
}

export interface IAboutTeamMember {
  id: string;
  title: string;
  description: string;
  icon: string;
  tags: string[];
  order: number;
}

export interface IAboutStat {
  id: string;
  value: string;
  label: string;
  order: number;
}

export interface IAboutApproach {
  title: string;
  description: string;
  members: IAboutTeamMember[];
}

export interface IAboutResponse {
  data: IAbout;
  success: boolean;
  message?: string;
}

export interface IAboutError {
  success: false;
  message: string;
  error?: string;
  statusCode?: number;
}

export interface AboutModel {
  id: string;
  hero_title: string;
  hero_subtitle: string;
  story_title: string;
  story_paragraphs: string[];
  story_highlight_title: string;
  story_highlight_description: string;
  story_highlight_icon: string;
  location_title: string;
  location_address: string;
  location_latitude?: number;
  location_longitude?: number;
  created_at: Date;
  updated_at: Date;
}

export interface AboutValueModel {
  id: string;
  about_id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  created_at: Date;
  updated_at: Date;
}

export interface AboutTeamMemberModel {
  id: string;
  about_id: string;
  title: string;
  description: string;
  icon: string;
  tags: string[];
  order: number;
  created_at: Date;
  updated_at: Date;
}

export interface AboutStatModel {
  id: string;
  about_id: string;
  value: string;
  label: string;
  order: number;
  created_at: Date;
  updated_at: Date;
}

export interface AboutContactModel {
  id: string;
  about_id: string;
  title: string;
  description: string;
  cta_text: string;
  cta_icon: string;
  created_at: Date;
  updated_at: Date;
}
