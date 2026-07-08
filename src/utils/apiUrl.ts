import type { Game } from "@/types/game";
import type { Offer } from "@/types/offer";

export function apiGameImageUrl(
  game: Pick<Game, "image_bucket" | "image">,
): string {
  return game.image_bucket ?? "";
}

export function apiOfferLogoUrl(
  offer: Pick<Offer, "logo_bucket" | "logo">,
): string {
  return offer.logo_bucket ?? "";
}
