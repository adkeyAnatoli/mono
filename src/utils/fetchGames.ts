import { Game } from "@/types/game";
import { getJsonWithRetry } from "@/utils/http";
import { getOrFetch, getStale } from "@/utils/apiCache";
import { apiGameImageUrl } from "@/utils/apiUrl";
import { getWebsiteApiHeaders, getWebsiteApiUrl } from "@/utils/websiteApi";

const TTL_MS = 30_000;
const STALE_MS = 60_000;

export async function fetchGames(type: string): Promise<Game[]> {
  const key = `games:${type}`;
  try {
    const data = await getOrFetch<Game[]>(key, TTL_MS, async () => {
      const games = await getJsonWithRetry<Game[]>(
        getWebsiteApiUrl(`get-games/${type}`),
        { headers: getWebsiteApiHeaders() },
      );
      return games.map((game) => {
        const imageUrl = apiGameImageUrl(game);
        return {
          ...game,
          image: imageUrl,
          optimizedImage: imageUrl,
        };
      });
    });
    return data;
  } catch {
    const stale = getStale<Game[]>(key, STALE_MS);
    if (stale) return stale;
    return [];
  }
}
