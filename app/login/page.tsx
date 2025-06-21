import { url } from '../layout';
import LogInContent from './LogInContent';

export const metadata = {
  title: 'Hello Casino UK Login Guide – Secure Access, Registration & Bonuses',
  alternates: {
    canonical: `https://${url}/login`,
  },
  description:
    'Hello Casino UK offers a fast, secure login process for all players, along with easy account setup and verified access to welcome bonuses. This step-by-step guide covers everything from registration to claiming promotions. Sign in today and enjoy trusted online gaming.',
};

export default function GamesPage() {
  return <LogInContent />;
}
