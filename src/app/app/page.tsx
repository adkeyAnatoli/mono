import { url } from '../layout';
import AppContent from './AppContent';

export const metadata = {
  title: 'Coral Casino UK App 24/7 – Mobile Gaming Anytime and Anywhere',
  alternates: {
    canonical: `https://${url}/app`,
  },
  description:
    'Download the Coral Casino UK application for seamless mobile gaming. Play slots, table games, and live casino with secure access on iOS and Android devices everywhere.',
};

export default function GamesPage() {
  return <AppContent />;
}
