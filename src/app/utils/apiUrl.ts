import type {
  IGame,
  IOffer,
  IProviders,
} from '@/app/interfaces/mainInterfaces';

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

export function apiProviderImageUrl(
  provider: Pick<IProviders, 'image_bucket' | 'image'>
): string {
  return provider.image_bucket ?? '';
}
