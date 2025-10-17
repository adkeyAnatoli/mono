import {
  IGame,
  IPayments,
  IProviders,
} from '@/src/app/interfaces/mainInterfaces';

const BASE_URL = 'https://api.adkey-seo.com/api/website';

// Получение игр
export async function getGames(type: string): Promise<IGame[]> {
  try {
    const res = await fetch(`${BASE_URL}/get-games/${type}`, {
      cache: 'no-store',
    });

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

// Получение платежек
export async function getPayments(idSite: string): Promise<IPayments[]> {
  try {
    const res = await fetch(`${BASE_URL}/get-payments/${idSite}`, {
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

// Получение провайдеров
export async function getProviders(): Promise<IProviders[]> {
  try {
    const res = await fetch(`${BASE_URL}/get-providers/`, {
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
