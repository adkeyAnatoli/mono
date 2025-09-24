import { url } from '../layout';
import AppContent from './AppContent';

export const metadata = {
  title: 'Cop Slots Casino UK – Mobile Version, Secure Play, Fast Access',
  alternates: {
    canonical: `https://${url}/app`,
  },
  description:
    'Cop Slots Casino UK delivers smooth mobile play, fair bonuses, and secure payments on every device. Join today to explore slots, live games, and full promotions anywhere.',
};

export default function GamesPage() {
  return <AppContent />;
}
