export interface ITestimonial {
  testifier: string;
  title: string;
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
  cta: string;
  heroTitle: string;
  heroContent: string;
  testimonials: ITestimonial[];
  services: IServicesOffered[];
}
