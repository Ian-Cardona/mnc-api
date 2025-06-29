export interface IAbout {
  hero: IAboutHero;
  story: IAboutStory;
  values: IAboutValue[];
  approach: IAboutApproach;
  team: IAboutTeamMember[];
  stats: IAboutStat[];
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
}

export interface IAboutTeamMember {
  id: string;
  title: string;
  description: string;
  icon: string;
  tags: string[];
}

export interface IAboutStat {
  id: string;
  value: string;
  label: string;
}

export interface IAboutApproach {
  title: string;
  description: string;
  members: IAboutTeamMember[];
}
