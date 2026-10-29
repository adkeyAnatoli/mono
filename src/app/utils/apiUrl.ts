import type { IGame, IOffer } from '@/app/interfaces/mainInterfaces';

export function apiGameImageUrl(
  game: Pick<IGame, 'image_bucket' | 'image'>
): string {
  return game.image_bucket ?? '';
}

export function apiOfferLogoUrl(
  offer: Pick<IOffer, 'logo_bucket' | 'logo'>
): string {
  return offer.logo_bucket ?? '';
}
