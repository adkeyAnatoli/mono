import { url } from '../layout';
import LogInContent from './LogInContent';

export const metadata = {
  title: 'Ripper Casino Australia Login Procedure – Secure Access Guide',
  alternates: {
    canonical: `https://${url}/login`,
  },
  description:
    'Ripper Casino Australia makes account access simple, fast, and secure. This complete login guide explains every step — from entering credentials to solving errors and verifying your account. Follow these clear instructions to enjoy safe gaming and smooth access today.',
};

export default function LoginPage() {
  return <LogInContent />;
}
