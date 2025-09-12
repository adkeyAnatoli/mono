import GamesContent from './GamesContent';
import { url } from '@/app/layout';

export const metadata = {
  title: 'Lucky Boys Casino UK – Explore Slots, Tables & Live Games',
  alternates: {
    canonical: `https://${url}/games`,
  },
  description:
    'Lucky Boys Casino UK delivered slots, tables, jackpots, and live dealer games with variety and depth. Discover the highlights of its collection and learn what made it unique.',
};

export default function GamesPage() {
  return <GamesContent />;
}
