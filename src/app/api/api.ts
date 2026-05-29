import { IBonuses, IGame } from '@/src/app/interfaces/mainInterfaces';

const BASE_URL = 'https://api.adkey-seo.com/api/website';
const idSite = process.env.NEXT_PUBLIC_SITE_ID;

export async function getGames(type: string): Promise<IGame[]> {
  try {
    const res = await fetch(`${BASE_URL}/get-games/${type}?view=vertical`);

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

// export async function getPayments(): Promise<IPayments[]> {
//   try {
//     const res = await fetch(`${BASE_URL}/get-payments/${idSite}`);

//     if (!res.ok) {
//       console.error(`getPayments error: ${res.status} ${res.statusText}`);
//       return [];
//     }

//     return await res.json();
//   } catch (error) {
//     console.error('getPayments fetch failed:', error);
//     return [];
//   }
// }

// export async function getProviders(): Promise<IProviders[]> {
//   try {
//     const res = await fetch(`${BASE_URL}/get-providers/`);

//     if (!res.ok) {
//       console.error(`getProviders error: ${res.status} ${res.statusText}`);
//       return [];
//     }

//     return await res.json();
//   } catch (error) {
//     console.error('getProviders fetch failed:', error);
//     return [];
//   }
// }

export async function getBonuses(): Promise<IBonuses> {
  try {
    const res = await fetch(`${BASE_URL}/get-geo-text/${idSite}/gr`);

    if (!res.ok) {
      console.error(`getProviders error: ${res.status} ${res.statusText}`);
      return { content: '' };
    }

    return await res.json();
  } catch (error) {
    console.error('getProviders fetch failed:', error);
    return { content: '' };
  }
}
