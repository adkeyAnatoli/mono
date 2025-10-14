import { qs, createEl } from "../utils/dom.js";
import { getLastData, getDataH1 } from "../data/content-manager.js";
import { appState } from "../state/app-state.js";
import { navigateToOffer } from "../utils/navigation.js";

export function renderAdvantages() {
  const mount = qs("#advantages");
  if (!mount) {
    console.warn("Advantages element not found");
    return;
  }

  const lastData = getLastData();
  const dataH1 = getDataH1();
  mount.classList.add("advantages", "redSection");
  const container = createEl("div", { className: "container" });
  const wrap = createEl("div", { className: "advantagesSection_wrapper" });

  const left = createEl("div", { className: "left" });
  const title = createEl("h3", { className: "title", text: "Advantages" });
  const ul = createEl("ul");

  (lastData.left || []).forEach((text) => {
    const li = createEl("li");
    const star = createEl("img");
    star.src = "./public/svg/star.svg";
    star.width = 30;
    star.height = 30;
    star.alt = "star";
    const p = createEl("p");
    p.textContent = text;
    li.appendChild(star);
    li.appendChild(p);
    ul.appendChild(li);
  });

  const know = appState.offer
    ? createEl("button", { className: "button-primary" })
    : createEl("button", { className: "button-primary" });
  know.textContent = "Know more";
  if (appState.offer) {
    // know.href = appState.offer.link;
    know.addEventListener("click", (ev) => {
      ev.preventDefault();
      navigateToOffer(appState.offer.link);
    });
  }

  left.appendChild(title);
  left.appendChild(ul);
  left.appendChild(know);

  const right = createEl("div", { className: "right" });
  const rTitle = createEl("h3", {
    className: "title",
    text: dataH1.titleApp || "App",
  });
  const phone = createEl("img");
  phone.src = "./public/sectionImg/slot2.webp";
  phone.className = "backImg";
  phone.alt = "Mobile";

  const stores = createEl("div", { className: "stores" });
  const appStore = createEl("a");
  appStore.href = "#";
  appStore.target = "_blank";
  appStore.rel = "nofollow noopener";
  appStore.addEventListener("click", (ev) => {
    ev.preventDefault();
    navigateToOffer(appState.offer.link);
  });
  appStore.innerHTML = '<img src="./public/appstore.png" alt="App Store" />';

  const playStore = createEl("a");
  playStore.href = "#";
  playStore.target = "_blank";
  playStore.rel = "nofollow noopener";
  playStore.addEventListener("click", (ev) => {
    ev.preventDefault();
    navigateToOffer(appState.offer.link);
  });
  playStore.innerHTML =
    '<img src="./public/googleplay.png" alt="Google Play" />';

  stores.appendChild(appStore);
  stores.appendChild(playStore);

  right.appendChild(rTitle);
  right.appendChild(phone);
  right.appendChild(stores);

  wrap.appendChild(left);
  wrap.appendChild(right);
  container.appendChild(wrap);
  mount.appendChild(container);

  console.log("Advantages rendered");
}
