import { url } from "../layout";
import LoginContent from "./LoginContent";

const ogTitle =
  "Crown Casino Login Guide: Access Online & On-Site in Australia";
const metaDescription =
  "Discover how to log in to Crown Casino in Melbourne, Perth, or Sydney, and learn the steps for accessing the Crown online platform. Entry rules, dress code, registration, and login tips explained.";

export const metadata = {
  title: ogTitle,
  description: metaDescription,
  alternates: {
    canonical: `https://${url}/login`,
  },
  openGraph: {
    type: "website",
    url: `https://${url}/login`,
    title: ogTitle,
    description: metaDescription,
  },
  twitter: {
    title: ogTitle,
    description: metaDescription,
    card: "summary_large_image",
  },
};

export default function LoginPage() {
  return <LoginContent />;
}
