import { url } from '../layout';
import BonusContent from './BonusContent';

export const metadata = {
  title: 'Lucky Boys Casino UK Bonuses – 300% Deposit Boost or 50% Cashback',
  alternates: {
    canonical: `https://${url}/bonus`,
  },
  description:
    'Lucky Boys Casino UK brings players two unique welcome bonuses. Choose between a 300% deposit match or a 50% cashback on early losses. Join now and claim your preferred reward.',
};

export default function GamesPage() {
  return <BonusContent />;
}
