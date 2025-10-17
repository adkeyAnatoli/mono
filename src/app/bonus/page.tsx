import { url } from '../layout';
import BonusContent from './BonusContent';

export const metadata = {
  title: 'Ripper Casino Australia – Verified Bonuses, Codes & Cashback',
  alternates: {
    canonical: `https://${url}/bonus`,
  },
  description:
    'Ripper Casino Australia features a complete lineup of welcome offers, crypto rewards, and cashback deals tailored for local players. Learn how to activate the best promo codes, understand wagering terms, and claim exclusive bonuses designed to enhance every gaming experience.',
};

export default function BonusPage() {
  return <BonusContent />;
}
