import { url } from '../layout';
import BonusContent from './BonusContent';

export const metadata = {
  title: 'Hello Casino UK Bonuses – Claim £500 Welcome Bonus + Free Spins Now',
  alternates: {
    canonical: `https://${url}/bonus`,
  },
  description:
    'Hello Casino UK offers up to £500 in deposit bonuses plus 100 free spins across your first three deposits. Regular promotions, loyalty rewards, and VIP perks make it a top choice for UK players. Sign up today and make the most of structured, fair-play bonuses.',
};

export default function GamesPage() {
  return <BonusContent />;
}
