import { getJsonWithRetry } from "@/utils/http";
import { HomePageProps, Offer } from "@/types/offer";
import { getOrFetch, getStale } from "@/utils/apiCache";
import { apiOfferLogoUrl } from "@/utils/apiUrl";
import { getWebsiteApiUrl } from "@/utils/websiteApi";

const TTL_MS = 60_000;
const STALE_MS = 120_000;

export async function fetchOffers(): Promise<HomePageProps> {
  const siteId = process.env.NEXT_PUBLIC_SITE_ID;
  if (!siteId) return { country: "", offers: [] };

  const key = `offers:${siteId}`;
  try {
    const data = await getOrFetch<HomePageProps>(key, TTL_MS, async () => {
      const res = await getJsonWithRetry<{
        website?: { country_name?: string };
        offers?: Offer[];
      }>(getWebsiteApiUrl(`get-website/${siteId}`));
      const website = res?.website ?? {};
      const offers = (res?.offers ?? []) as Offer[];
      const updatedOffers = offers.map((offer) => {
        const logoUrl = apiOfferLogoUrl(offer);
        return {
          ...offer,
          logo: logoUrl,
          optimizedLogo: logoUrl,
        };
      });
      return { country: website.country_name ?? "", offers: updatedOffers };
    });
    return data;
  } catch {
    const stale = getStale<HomePageProps>(key, STALE_MS);
    if (stale) return stale;
    return { country: "", offers: [] };
  }
}
