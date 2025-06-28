export interface IServicesHero {
  title: string;
  subtitle: string;
  description: string;
  additionalInfo: string;
}

export interface IServiceList {
  title: string;
  description: string;
  icon: string;
  image: string;
  color: string;
}

export interface IWhyChooseUsItem {
  title: string;
  description: string;
  icon: string;
}

export interface IServicesCTA {
  title: string;
  description: string;
  buttonText: string;
}

export interface IServices {
  hero: IServicesHero;
  whyChooseUs: IWhyChooseUsItem[];
  services: IServiceList[];
  cta?: IServicesCTA;
}
