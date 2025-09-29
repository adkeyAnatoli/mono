import { url } from "../layout";
import PokiesContent from "./PokiesContent";

const ogTitle =
  "Crown Casino Pokies: Explore Online & On-Site Pokies in Australia";
const metaDescription =
  "Discover the pokies at Crown Casino in Melbourne, Perth, and Sydney. Learn about popular land-based pokies, online games, welcome bonuses, and tips for responsible play.";

export const metadata = {
  title: ogTitle,
  description: metaDescription,
  alternates: {
    canonical: `https://${url}/pokies`,
  },
  openGraph: {
    type: "website",
    url: `https://${url}/pokies`,
    title: ogTitle,
    description: metaDescription,
  },
  twitter: {
    title: ogTitle,
    description: metaDescription,
    card: "summary_large_image",
  },
};

export default function PokiesPage() {
  return <PokiesContent />;
}
