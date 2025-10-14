import { qs } from "../utils/dom.js";
import { SITE_NAME } from "../config/config.js";

export function renderFooter() {
  const footer = qs("#site-footer");
  if (!footer) {
    console.warn("Footer element not found");
    return;
  }

  footer.innerHTML = `
    <div class="footer">
      <div class="wrapper container">
        <div class="logo">
          <a href="#main" title="Logo">
            <img src="/public/svg/logo.svg" alt="Hippozino Casino UK Logo" title="Hippozino Casino UK Logo" />
          </a>
        </div>
        <div class="payments">
          <div class="paymentsBlock"><img class="blockColor" src="/public/payments/masC.svg" alt="MasterCard in Hippozino Casino UK" title="MasterCard in Hippozino Casino UK"/></div>
          <div class="paymentsBlock"><img class="blockColor" src="/public/payments/vC.svg" alt="Visa in Hippozino Casino UK"  title="Visa in Hippozino Casino UK"/></div>
          <div class="paymentsBlock"><img class="blockColor" src="/public/payments/netC.svg" alt="Neteller in Hippozino Casino UK" title="Neteller in Hippozino Casino UK" /></div>
          <div class="paymentsBlock"><img class="blockColor" src="/public/payments/skC.svg" alt="Skrill in Hippozino Casino UK" title="Skrill in Hippozino Casino UK" /></div>
          <div class="paymentsBlock"><img class="blockColor" src="/public/payments/bitC.svg" alt="Bitcoin in Hippozino Casino UK" title="Bitcoin in Hippozino Casino UK"/></div>
          <div class="paymentsBlock"><img class="blockColor" src="/public/payments/litC.svg" alt="Litecoin in Hippozino Casino UK" title="Litecoin in Hippozino Casino UK"/></div>
          <div class="paymentsBlock"><img class="blockColor" src="/public/payments/ethC.svg" alt="Ethereum in Hippozino Casino UK" title="Ethereum in Hippozino Casino UK"/></div>
        </div>
        <div class="partners">
          <div class="partnersBlock"><img class="blockColor" src="/public/partners/gpC.svg" alt="GPWA in Hippozino Casino UK" title="GPWA in Hippozino Casino UK"/></div>
          <div class="partnersBlock"><img class="blockColor" src="/public/partners/gwC.svg" alt="Gamble Aware in Hippozino Casino UK" title="Gamble Aware in Hippozino Casino UK" /></div>
          <div class="partnersBlock"><img class="blockColor" src="/public/partners/gcC.svg" alt="Game care in Hippozino Casino UK" title="Game care in Hippozino Casino UK"/></div>
          <div class="partnersBlock"><img class="blockColor" src="/public/partners/gtC.svg" alt="Gambling Therapy in Hippozino Casino UK" title="Gambling Therapy in Hippozino Casino UK"/></div>
          <div class="partnersBlock"><img class="blockColor" src="/public/partners/gbC.svg" alt="Gamban in Hippozino Casino UK"  title="Gamban in Hippozino Casino UK"/></div>
          <div class="partnersBlock"><img class="blockColor" src="/public/partners/bbC.svg" alt="BetBlocker in Hippozino Casino UK" title="BetBlocker in Hippozino Casino UK" /></div>
          <div class="partnersBlock"><img class="blockColor" src="/public/partners/itlC.svg" alt="ITech Labs in Hippozino Casino UK" title="ITech Labs in Hippozino Casino UK"/></div>
          <div class="partnersBlock"><img class="blockColor" src="/public/partners/ecC.svg" alt="Ecogra in Hippozino Casino UK" title="Ecogra in Hippozino Casino UK" /></div>
        </div>
        <div>
          <p class="copyright">
            <span class="copyrightLeft">18+</span>
            <span class="copyrightRight">Copyright © ${new Date().getFullYear()} ${SITE_NAME}</span>
          </p>
        </div>
      </div>
    </div>
  `;

  console.log("Footer rendered");
}
