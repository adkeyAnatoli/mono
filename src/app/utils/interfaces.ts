export interface IRoot {
  website: IWebsite;
  offers: IOffer[];
}

export interface IWebsite {
  id: number;
  link: string;
  type: string;
  android_app: any;
  ios_app: any;
  country_code: string;
  country_name: string;
}

export interface IOffer {
  id: number;
  name: string;
  sub2: string;
  countries: string[];
  logo: string;
  logo_light: string;
  bonuses: IBonuses;
  domain_id: number;
  wager?: string;
  bonus_code: any;
  type: string;
  active: number;
  created_at: string;
  updated_at: string;
  domain_url: string;
  position: any;
  country_code: any;
  website_id: any;
  link: string;
}

export interface IBonuses {
  rate: string;
  amount: string;
  country: string;
  free_spins: string;
  welcome_bonus: string;
}
export interface IPayment {
  payment_id: number;
  name: string;
  image: string;
  country: string;
  commission: string;
  processing_time: string;
  min_dep: string;
  type: string;
}

export interface IGame {
  id: number | string;
  name: string;
  image: string;
}

export interface IProvider {
  id: number | string;
  name: string;
  image: string;
}

export interface IImageGroup {
  id: number;
  group: IImage[];
}

export interface IImage {
  id: number;
  src: string;
  alt: string;
}

export interface ICasinoCard {
  id: string;
  src: string;
  alt: string;
  name: string;
  bonus: string;
}

export interface IBonusDetail {
  id: string;
  casinoSrc: string;
  name: string;
  bonuses: string;
  rate: string;
  freeSpins: string;
  moreInfo: {
    maxAmount: string;
    wager: string;
    bonusCode?: string;
  };
}

export interface ISiteDataProps {
  siteData?: IRoot | undefined;
  gamesTop?: IGame[];
  payments?: IPayment[];
  providerImages?: IProvider[];
}

interface Paragraph {
  type: "paragraph";
  text: string;
}

interface List {
  type: "list-dotted" | "list-number";
  items: string[];
}

type ContentItem = Paragraph | List;
export interface CommonSectionProps {
  data: {
    title: string;
    content: ContentItem[];
    sections: Array<{
      heading: string;
      content: ContentItem[];
    }>;
  };
}
export interface IData {
  title: string;
  content: ContentItem[];
  sections: {
    heading: string;
    content: ContentItem[];
    sections?: {
      heading: string;
      content: ContentItem[];
    }[];
  }[];
}
