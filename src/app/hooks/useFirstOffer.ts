'use client';

import { useWebsite } from '@/app/context/WebsiteProvider';
import type { IOffer } from '@/app/interfaces/mainInterfaces';

export function useFirstOffer(): IOffer | null {
  const { website } = useWebsite();
  return website?.offers?.[0] ?? null;
}
