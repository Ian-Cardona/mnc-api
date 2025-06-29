export interface IHero {
  title: string;
  subtitle: string;
  cta: string;
}

export interface ITestimonial {
  testifier: string;
  company: string;
  message: string;
}

export interface IServicesOfferedItem {
  description: string;
}

export interface IServicesOffered {
  title: string;
  items: IServicesOfferedItem[];
}

export interface IHome {
  hero: IHero;
  servicesHeader: string;
  servicesDescription: string;
  testimonialsHeader: string;
  testimonialsDescription: string;
  testimonials: ITestimonial[];
  services: IServicesOffered[];
}
