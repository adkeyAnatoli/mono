import GamesContent from './GamesContent';
import { url } from '@/src/app/layout';

export const metadata = {
  title: 'Coral Casino UK Games – Top Slots, Tables Games, and Live Play',
  alternates: {
    canonical: `https://${url}/games`,
  },
  description:
    'Explore Coral Casino UK games, including slots, table games, and live dealer titles. Enjoy safe, exciting, and fair gaming with trusted providers 24/7 to win at any time.',
};

export default function GamesPage() {
  return <GamesContent />;
}
