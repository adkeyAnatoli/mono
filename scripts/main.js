import { loadData } from "./data/data-loader.js";
import { setupRedirectIfNeeded } from "./utils/navigation.js";
import { renderHeader } from "./components/header.js";
import { renderBonus } from "./components/bonus.js";
import { renderTopCasino } from "./components/top-casino.js";
import { renderBonusDetails } from "./components/bonus-details.js";
import { renderTopGames } from "./components/top-games.js";
import { renderApp } from "./components/app.js";
import { renderFAQ } from "./components/faq.js";

async function init() {
  try {
    await loadData();
    setupRedirectIfNeeded();
    renderHeader();
    renderBonus();
    renderTopCasino();
    renderBonusDetails();
    renderTopGames();
    renderApp();
    renderFAQ();
    
  } catch (error) {
    console.error("❌ Failed to initialize application:", error);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

window.app = {
  init,
  reload: () => {
    document.querySelectorAll("[id]").forEach((el) => (el.innerHTML = ""));
    init();
  },
};
console.log("Main module loaded");
