import { url } from '../layout';
import BonusContent from './BonusContent';

export const metadata = {
  title: 'Cop Slots Casino UK – Bonuses, Free Spins and Loyalty Rewards',
  alternates: {
    canonical: `https://${url}/bonus`,
  },
  description:
    'Cop Slots Casino UK offers free spins, welcome deals, and loyalty rewards for all players. Explore fair terms and claim your promotions today with secure play and fast access.',
};

export default function GamesPage() {
  return <BonusContent />;
}
