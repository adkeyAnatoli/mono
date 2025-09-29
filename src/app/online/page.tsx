import { url } from "../layout";
import GamesContent from "./GamesContent";

const ogTitle =
  "Crown Casino Online: Play Pokies, Table Games & Live Dealer Anywhere";
const metaDescription =
  "Experience Crown Casino Online from home or any other place globally. Enjoy pokies, table games, live dealers, and exciting bonuses while playing safely and responsibly.";

export const metadata = {
  title: ogTitle,
  description: metaDescription,
  alternates: {
    canonical: `https://${url}/online`,
  },
  openGraph: {
    type: "website",
    url: `https://${url}/online`,
    title: ogTitle,
    description: metaDescription,
  },
  twitter: {
    title: ogTitle,
    description: metaDescription,
    card: "summary_large_image",
  },
};

export default function GamesPage() {
  return <GamesContent />;
}
