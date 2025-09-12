import { url } from '../layout';
import AppContent from './AppContent';

export const metadata = {
  title: 'Lucky Boys Casino UK – Mobile Version with Full Game Access',
  alternates: {
    canonical: `https://${url}/app`,
  },
  description:
    'Lucky Boys Casino UK offers a smooth mobile version with slots, tables, and live dealer games. Explore secure payments and seamless play today – join the action now.',
};

export default function GamesPage() {
  return <AppContent />;
}
