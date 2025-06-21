import GamesContent from './GamesContent';
import { url } from '@/app/layout';

export const metadata = {
  title: 'Hello Casino UK – Play Slots, Table Games & Live Casino Online Now',
  alternates: {
    canonical: `https://${url}/games`,
  },
  description:
    'Hello Casino UK delivers a premium selection of online slots, live dealer games, and classic tables from top software providers. Join today to enjoy smooth gameplay, fast access across devices, and a wide range of trusted casino titles for every type of player.',
};

export default function GamesPage() {
  return <GamesContent />;
}
