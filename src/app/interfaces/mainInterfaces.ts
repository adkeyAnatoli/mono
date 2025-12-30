export interface IWebsite {
  website: {
    id: number;
    link: string;
    type: string;
    android_app: string;
    ios_app: string;
    country_name: string;
    country_code: string;
  };
  offers: IOffer[];
}

export interface IOffer {
  id: number;
  name: string;
  logo: string;
  logo_light: string;
  bonuses: {
    country: string;
    rate: string;
    amount: string;
    free_spins: string;
    welcome_bonus: string;
  };
  wager: string;
  bonus_code: string;
  link: string;
}

export interface IGame {
  id: number;
  name: string;
  image: string;
}

export interface IPayments {
  payment_id: number;
  name: string;
  image: string;
  commission: string;
  country: string;
  processing_time: string;
  min_dep: string;
  type: string;
}

export interface IProviders {
  id: number;
  name: string;
  image: string;
}
