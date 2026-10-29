import { IGame } from '@/app/interfaces/mainInterfaces';
import {
  getUpstreamApiOrigin,
  getUpstreamApiToken,
} from '@/app/utils/apiServerConfig';

function getUpstreamHeaders(): HeadersInit {
  const token = getUpstreamApiToken();
  const headers: HeadersInit = { Accept: 'application/json' };

  if (token) {
    headers['X-API-Key'] = token;
  }

  return headers;
}

export async function getGames(type: string): Promise<IGame[]> {
  try {
    const origin = getUpstreamApiOrigin();
    const res = await fetch(
      `${origin}/api/website/get-games/${type}?view=vertical`,
      { headers: getUpstreamHeaders(), cache: 'no-store' }
    );

    if (!res.ok) {
      console.error(`getGames error: ${res.status} ${res.statusText}`);
      return [];
    }
    return await res.json();
  } catch (error) {
    console.error('getGames fetch failed:', error);
    return [];
  }
}
