export interface INavBarLink {
  label: string;
  path: string;
  external?: boolean;
}

export interface INavBarCTA {
  label: string;
  url: string;
  external?: boolean;
}

export interface INavBar {
  links: INavBarLink[];
  cta?: INavBarCTA;
}
