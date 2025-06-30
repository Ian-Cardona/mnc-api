export interface IGuides {
  hero: IGuidesHero;
  forms: IGuidesFormLinks[],
  cta: string,
};

export interface IGuidesHero {
  title: string,
  subtitle: string,
};

export interface IGuidesFormLinks {
  name: string,
  url: string,
  description: string,
};
