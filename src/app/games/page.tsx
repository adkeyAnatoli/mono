import GamesContent from './GamesContent';
import { url } from '@/src/app/layout';

export const metadata = {
  title: 'Cop Slots Casino UK – Secure Games, Bonuses, and Player Rewards',
  alternates: {
    canonical: `https://${url}/games`,
  },
  description:
    'Cop Slots Casino UK delivers a wide choice of slots, jackpots, and live dealer table entertainment. Join today to explore secure play, trusted payments, and daily rewards.',
};

export default function GamesPage() {
  return <GamesContent />;
}
