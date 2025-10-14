import { qs, createEl } from '../utils/dom.js';
import { getDataH1, getH1Fallback } from '../data/content-manager.js';

export function renderH1() {
  const mount = qs("#h1");
  if (!mount) {
    console.warn("H1 element not found");
    return;
  }
  
  let titleData;
  try {
    titleData = getDataH1();
  } catch (error) {
    console.warn('getDataH1 failed, using fallback:', error);
    titleData = getH1Fallback();
  }
  
  const wrap = createEl("div", { className: "container" });
  const h1 = createEl("h1", { 
    className: "title-white", 
    text: titleData.title 
  });
  
  wrap.appendChild(h1);
  mount.appendChild(wrap);
  
  console.log("H1 rendered");
}
