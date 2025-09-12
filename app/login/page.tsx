import { url } from '../layout';
import LogInContent from './LogInContent';

export const metadata = {
  title: 'Lucky Boys Casino UK – Secure Login Procedure and Access Guide',
  alternates: {
    canonical: `https://${url}/login`,
  },
  description:
    'Lucky Boys Casino UK offers a safe way to log in and play online. Discover how to access your account quickly and keep it protected. Start today and enjoy smooth gameplay.',
};

export default function GamesPage() {
  return <LogInContent />;
}
