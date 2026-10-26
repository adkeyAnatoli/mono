import { IGame, IPayments, IProviders } from '@/app/interfaces/mainInterfaces';
import {
  getUpstreamApiOrigin,
  getUpstreamApiToken,
} from '@/app/utils/apiServerConfig';

const idSite = process.env.NEXT_PUBLIC_SITE_ID;

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

export async function getPayments(): Promise<IPayments[]> {
  try {
    const origin = getUpstreamApiOrigin();
    const res = await fetch(`${origin}/api/website/get-payments/${idSite}`, {
      headers: getUpstreamHeaders(),
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error(`getPayments error: ${res.status} ${res.statusText}`);
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error('getPayments fetch failed:', error);
    return [];
  }
}

export async function getProviders(): Promise<IProviders[]> {
  try {
    const origin = getUpstreamApiOrigin();
    const res = await fetch(`${origin}/api/website/get-providers/`, {
      headers: getUpstreamHeaders(),
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error(`getProviders error: ${res.status} ${res.statusText}`);
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error('getProviders fetch failed:', error);
    return [];
  }
}
