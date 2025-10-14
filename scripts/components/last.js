import { qs, createEl } from "../utils/dom.js";
import { getLastData } from "../data/content-manager.js";

export function renderLast() {
  const mount = qs("#last");
  if (!mount) {
    console.warn("Last element not found");
    return;
  }

  const lastData = getLastData();
  mount.classList.add("redSection");
  const container = createEl("div", { className: "container wrapper" });
  const h2 = createEl("h2", {
    className: "title-white",
    text: lastData.title,
  });
  container.appendChild(h2);

  (lastData.content || []).forEach((block) => {
    if (block.type === "paragraph") {
      const p = createEl("p", { className: "text" });
      p.textContent = block.text;
      container.appendChild(p);
    }
  });

  const grid = createEl("div", { className: "listBlock" });
  const left = createEl("div", { className: "lastBlockElementWrapper" });
  const right = createEl("div", { className: "lastBlockElementWrapper" });

  const lTitle = createEl("h4", {
    className: "title-white title-small",
    text: lastData.leftTitle,
  });
  const rTitle = createEl("h4", {
    className: "title-white title-small",
    text: lastData.rightTitle,
  });

  const lList = createEl("ul");
  (lastData.left || []).forEach((item) => {
    const li = createEl("li");
    li.classList.add("text");

    li.textContent = `${item}`;
    lList.appendChild(li);
  });

  const rList = createEl("ul");
  (lastData.right || []).forEach((item) => {
    const li = createEl("li");
    li.classList.add("text");
    li.textContent = `${item}`;
    rList.appendChild(li);
  });

  left.appendChild(lTitle);
  left.appendChild(lList);
  right.appendChild(rTitle);
  right.appendChild(rList);

  grid.appendChild(left);
  grid.appendChild(right);
  container.appendChild(grid);
  mount.appendChild(container);

  console.log("Last section rendered");
}
