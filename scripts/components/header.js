import { qs, createEl } from "../utils/dom.js";
import { navigateToOffer } from "../utils/navigation.js";
import { appState } from "../state/app-state.js";

export function renderHeader() {
  const header = qs("#site-header");
  const offer = appState.offer;

  const burger = qs(".hamburger");
    burger.addEventListener("click", (ev) => {
    ev.preventDefault();
    burger.classList.toggle("open");
    const ulBlock = header.querySelector(".ulBlock");
    if (ulBlock) {
      ulBlock.classList.toggle("open");
    }
  });

  if (offer) {
    const play = header.querySelector(".register");
    if (play) {
      play.addEventListener("click", (ev) => {
        ev.preventDefault();
        if (appState.offer)
          navigateToOffer(appState.offer.id, appState.offer.link);
      });
    }
  }
}
