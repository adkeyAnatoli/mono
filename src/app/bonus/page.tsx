import { url } from "../layout";
import BonusContent from "./BonusContent";

const ogTitle =
  "Crown Casino Bonuses: Exclusive Online Offers and On-Site Rewards";
const metaDescription =
  "Discover Crown Casino bonuses in Australia. Learn about welcome packages for online players, loyalty rewards, and exclusive perks available at Crown’s land-based resorts.";

export const metadata = {
  title: ogTitle,
  description: metaDescription,
  alternates: {
    canonical: `https://${url}/bonus`,
  },
  openGraph: {
    type: "website",
    url: `https://${url}/bonus`,
    title: ogTitle,
    description: metaDescription,
  },
  twitter: {
    title: ogTitle,
    description: metaDescription,
    card: "summary_large_image",
  },
};

export default function BonusPage() {
  return <BonusContent />;
}
