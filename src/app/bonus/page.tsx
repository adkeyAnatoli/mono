import { url } from "../layout";
import BonusContent from "./BonusContent";

export const metadata = {
  title: "Coral Casino UK Bonus – Exclusive Offers and Free Spins for You",
  alternates: {
    canonical: `https://${url}/bonus`,
  },
  description:
    "Claim your welcome and other Coral Casino UK bonuses today! Get lots of free free spins, welcome packages, and seasonal promotions to boost your online gaming experience.",
};

export default function BonusPage() {
  return <BonusContent />;
}
