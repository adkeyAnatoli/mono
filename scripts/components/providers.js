import { qs, createEl } from '../utils/dom.js';
import { appState } from '../state/app-state.js';

export function renderProviders() {
  const mount = qs("#providers");
  if (!mount) {
    console.warn("Providers element not found");
    return;
  }
  
  if (!appState.providers || appState.providers.length === 0) {
    console.warn("No providers data available");
    return;
  }
  
  const section = createEl("section", { className: "redSectionSecond" });
  const container = createEl("div", { className: "container wrapper" });
  const h2 = createEl("h2", {
    className: "title-white",
    text: "Software Providers"
  });
  
  const list = createEl("div", { className: "payments" });
  
  appState.providers.slice(0, 16).forEach((provider) => {
    const block = createEl("div", { className: "paymentsBlock" });
    const span = createEl("span", { text: provider.name });
    block.appendChild(span);
    list.appendChild(block);
  });
  
  container.appendChild(h2);
  container.appendChild(list);
  section.appendChild(container);
  mount.appendChild(section);
  
  console.log("Providers rendered");
}
