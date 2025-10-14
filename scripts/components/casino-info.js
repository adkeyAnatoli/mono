import { qs, createEl } from "../utils/dom.js";
import { getCasinoInfo } from "../data/content-manager.js";

function renderBlocks(container, blocks) {
  blocks.forEach((block) => {
    if (block.type === "paragraph") {
      const p = createEl("p", { className: "text" });
      p.textContent = block.text;
      container.appendChild(p);
    } else if (block.type === "list-dotted" && Array.isArray(block.items)) {
      const ul = createEl("ul");
      block.items.forEach((item) => {
        const li = createEl("li", {
          className: "text",
        });
        li.textContent = `${item}`;
        ul.appendChild(li);
      });
      container.appendChild(ul);
    } else if (block.type === "list-number" && Array.isArray(block.items)) {
      const ol = createEl("ol");
      block.items.forEach((item) => {
        const li = createEl("li", {
          className: "text",
        });
        li.textContent = item;
        ol.appendChild(li);
      });
      container.appendChild(ol);
    }
  });
}

export function renderCasinoInfo() {
  const mount = qs("#casino-info");
  if (!mount) {
    console.warn("Casino Info element not found");
    return;
  }

  const dataCasinoInfo = getCasinoInfo();
  const container = createEl("div", {
    className: "container casinoInfoSection_wrapper",
  });
  const firstBlock = createEl("div", {
    className: "casinoInfoSection_firstBlock",
  });
  const firstBlockText = createEl("div", {
    className: "casinoInfoSection_firstBlock_text",
  });
  const firstBlockImg = createEl("div", {
    className: "casinoInfoSection_firstBlock_image",
  });
  const h2 = createEl("h2", {
    className: "title-white",
    text: dataCasinoInfo.title,
  });
  const img = createEl("img");
  img.src = img.src = "./public/sectionImg/slot3.webp";
  img.width = 574;
  img.height = 321;
  img.alt = "Coral Casino UK Desktop";
  img.title = "Coral Casino UK Desktop";
  firstBlockImg.appendChild(img);
  container.appendChild(h2);
  firstBlock.appendChild(firstBlockText);
  firstBlock.appendChild(firstBlockImg);
  container.appendChild(firstBlock);

  if (Array.isArray(dataCasinoInfo.content)) {
    renderBlocks(firstBlockText, dataCasinoInfo.content);
  }

  const middleBlock = createEl("div", {
    className: "casinoInfoSection_middleBlock",
  });
  if (Array.isArray(dataCasinoInfo.mainSections)) {
    dataCasinoInfo.mainSections.forEach((sec) => {
      const h3 = createEl("h3", {
        className: "title-white title-small",
        text: sec.heading,
      });
      middleBlock.appendChild(h3);
      renderBlocks(middleBlock, sec.content || []);
    });
  }
  container.appendChild(middleBlock);
  mount.appendChild(container);

  console.log("Casino Info rendered");
}
