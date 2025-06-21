import { url } from '../layout';
import AppContent from './AppContent';

export const metadata = {
  title: 'Hello Casino UK Mobile Website – Games, Bonuses, and Experience',
  alternates: {
    canonical: `https://${url}/app`,
  },
  description:
    'Explore Hello Casino UK mobile website and enjoy smooth gameplay on your device. Learn about mobile bonuses, live games, app functionality, and secure payments.',
};

export default function GamesPage() {
  return <AppContent />;
}
