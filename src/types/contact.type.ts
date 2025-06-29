export interface IContact {
  hero: IContactHero;
  contactInfo: IContactInfo;
  socials: IContactSocials;
  businessHours: IBusinessHours[];
}

export interface IContactHero {
  title: string;
  subtitle: string;
}

export interface IContactInfo {
  phone: string;
  email: string;
  address: string;
}

export interface IContactSocials {
  facebook: string;
  linkedin: string;
}

export interface IBusinessHours {
  day: string;
  hours: string;
}
