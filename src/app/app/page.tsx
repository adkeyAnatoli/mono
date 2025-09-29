import { url } from "../layout";
import AppContent from "./AppContent";

const ogTitle = "Crown Casino App: Access via Mobile Shortcut on iOS & Android";
const metaDescription =
  "Crown Casino doesn’t have an official app, but you can create a mobile shortcut for quick access. Learn step-by-step instructions for iOS and Android devices.";

export const metadata = {
  title: ogTitle,
  description: metaDescription,
  alternates: {
    canonical: `https://${url}/app`,
  },
  openGraph: {
    type: "website",
    url: `https://${url}/app`,
    title: ogTitle,
    description: metaDescription,
  },
  twitter: {
    title: ogTitle,
    description: metaDescription,
    card: "summary_large_image",
  },
};

export default function AppPage() {
  return <AppContent />;
}
