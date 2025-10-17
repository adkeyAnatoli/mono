import { url } from '../layout';
import AppContent from './AppContent';
const year = new Date().getFullYear();
export const metadata = {
  title: `Ripper Casino Australia App – Mobile Gaming and Bonuses ${year}`,
  alternates: {
    canonical: `https://${url}/app`,
  },
  description:
    'Ripper Casino Australia delivers a smooth and secure mobile gaming experience with pokies, table games, and crypto payments. Access all bonuses and free spins through the mobile app or browser version. Join now to explore fast withdrawals, modern gameplay, and real rewards.',
};

export default function AppPage() {
  return <AppContent />;
}
