import { qs, createEl } from '../utils/dom.js';
import { appState } from '../state/app-state.js';
import { navigateToOffer } from '../utils/navigation.js';

export function renderPayments() {
  const mount = qs("#payments");
  if (!mount) {
    console.warn("Payments element not found");
    return;
  }
  
  const section = createEl("section", { className: "redSection" });
  const container = createEl("div", { className: "container" });
  const h2 = createEl("h2", { className: "title-white", text: "Payments" });
  const logos = createEl("div", { className: "payments" });
  
  const items = ["masC", "vC", "netC", "skC", "bitC", "litC", "ethC"];
  items.forEach((name) => {
    const block = createEl("div", { className: "paymentsBlock" });
    const img = createEl("img", { className: "blockColor" });
    img.src = `./public/payments/${name}.svg`;
    img.alt = name;
    img.onerror = function() {
      console.warn(`Payment icon not found: ${name}`);
    };
    block.appendChild(img);
    logos.appendChild(block);
  });
  
  container.appendChild(h2);
  container.appendChild(logos);
  section.appendChild(container);
  mount.appendChild(section);
  
  // Затем рендерим таблицы платежей если есть данные
  if (Array.isArray(appState.payments) && appState.payments.length > 0) {
    renderPaymentsTables(mount);
  }
  
  console.log("Payments rendered");
}

function renderPaymentsTables(mount) {
  // Desktop table
  const head = createEl("div", { className: "paymentsTableHead container" });
  head.innerHTML = [
    '<p class="table_block width-120 fix">Method</p>',
    '<p class="table_block width-140">Type</p>',
    '<p class="table_block width-140">Country</p>',
    '<p class="table_block width-140">Commission</p>',
    '<p class="table_block width-160">Processing time</p>',
    '<p class="table_block width-160">Minimum deposit</p>',
    '<p class="table_block last">Deposit</p>',
  ].join("");
  mount.appendChild(head);

  appState.payments.forEach((payment) => {
    const row = createEl("div", { className: "paymentsRow container" });
    const logo = createEl("img");
    logo.src = `https://api.adkey-seo.com/storage/images/payments/${payment.image}`;
    logo.alt = payment.name;
    logo.width = 120;
    logo.height = 70;
    logo.onerror = function() {
      this.src = "./public/images/payment-placeholder.svg";
    };
    
    const type = createEl("p", { text: payment.type || "—" });
    const country = createEl("p", { text: payment.country || "—" });
    const commission = createEl("p", { text: payment.commission || "—" });
    const time = createEl("p", { text: payment.processing_time || "—" });
    const min = createEl("p", { text: payment.min_dep || "—" });
    
    const deposit = appState.offer
      ? createEl("a", { className: "button-secondary table_block" })
      : createEl("button", { className: "button-secondary table_block" });
    
    deposit.textContent = "Deposit";
    if (appState.offer) {
      deposit.href = appState.offer.link;
      deposit.target = "_blank";
      deposit.rel = "nofollow noopener";
    }
    
    row.appendChild(logo);
    row.appendChild(type);
    row.appendChild(country);
    row.appendChild(commission);
    row.appendChild(time);
    row.appendChild(min);
    row.appendChild(deposit);
    mount.appendChild(row);
  });

  // Mobile cards
  appState.payments.forEach((payment) => {
    const card = createEl("div", { className: "paymentsCard container" });
    const head = createEl("div", { className: "paymentsCardHead" });
    
    const logo = createEl("img");
    logo.src = `https://api.adkey-seo.com/storage/images/payments/${payment.image}`;
    logo.alt = payment.name;
    logo.width = 140;
    logo.height = 64;
    logo.onerror = function() {
      this.src = "./public/images/payment-placeholder.svg";
    };
    
    const btn = appState.offer
      ? createEl("a", { className: "button-secondary" })
      : createEl("button", { className: "button-secondary" });
    
    btn.textContent = "Deposit";
    if (appState.offer) {
      btn.href = appState.offer.link;
      btn.target = "_blank";
      btn.rel = "nofollow noopener";
    }
    
    head.appendChild(logo);
    head.appendChild(btn);
    
    const body = createEl("div", { className: "paymentsCardBody" });
    const mkRow = (label, value) => {
      const row = createEl("div", { className: "row" });
      const l = createEl("p", { className: "label", text: label });
      const v = createEl("p", { text: value || "—" });
      row.appendChild(l);
      row.appendChild(v);
      return row;
    };
    
    body.appendChild(mkRow("Type", payment.type));
    body.appendChild(mkRow("Country", payment.country));
    body.appendChild(mkRow("Commission", payment.commission));
    body.appendChild(mkRow("Processing time", payment.processing_time));
    body.appendChild(mkRow("Minimum deposit", payment.min_dep));
    
    card.appendChild(head);
    card.appendChild(body);
    mount.appendChild(card);
  });
}
