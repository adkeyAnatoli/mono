import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT = path.join(__dirname, '..');
const FIGMA_VARS = path.join(PROJECT, 'figma-variables.json');
const OUT_CSS = path.join(PROJECT, 'src', 'app', 'styles', 'theme-tokens.css');

function parseFontToken(raw) {
  if (typeof raw !== 'string') return null;
  const match = raw.match(
    /^Font\(family:\s*"([^"]+)",\s*style:\s*([^,]+),\s*size:\s*(\d+)\)$/
  );
  if (!match) return null;
  return {
    family: match[1].trim(),
    style: match[2].trim(),
    size: Number(match[3]),
  };
}

function styleToWeight(style) {
  switch ((style || '').toLowerCase()) {
    case 'medium':
      return 500;
    case 'bold':
      return 700;
    case 'extrabold':
    case 'extra bold':
    case 'heavy':
      return 800;
    default:
      return 700;
  }
}

function pickFirstFont(figma, keys) {
  for (const k of keys) {
    const parsed = parseFontToken(figma[k]);
    if (parsed) return parsed;
  }
  return null;
}

function quote(value) {
  return `"${value}"`;
}

function main() {
  const raw = fs.readFileSync(FIGMA_VARS, 'utf8');
  const figma = JSON.parse(raw);

  const headingFont = pickFirstFont(figma, [
    'Desktop/H1',
    'Desktop/H2',
    'Desktop/H3',
    'Desktop/H4',
    'Desktop/H5',
    'Desktop/Slogan',
    'Desktop/Welcome',
  ]);
  const bodyFont = pickFirstFont(figma, [
    'Desktop/B1-20',
    'Desktop/B2-24',
    'Desktop/B3-32',
    'Desktop/Card Block',
  ]);

  const h1 = parseFontToken(figma['Desktop/H1']);
  const h2 = parseFontToken(figma['Desktop/H2']);
  const h3 = parseFontToken(figma['Desktop/H3']);
  const h4 = parseFontToken(figma['Desktop/H4']);
  const h5 = parseFontToken(figma['Desktop/H5']);
  const body20 = parseFontToken(figma['Desktop/B1-20']);
  const body24 = parseFontToken(figma['Desktop/B2-24']);

  const colorBg = figma['Monobrand/main color/BG'];
  const colorFirst = figma['Monobrand/main color/first color'];
  const colorSecond = figma['Monobrand/main color/second color'];
  const colorFooter = figma['Monobrand/main color/footer color'];
  const colorText =
    figma['Monobrand/main color/text'] ||
    figma['Monobrand/White/100%'] ||
    figma['White/100%'];
  const colorWhite =
    figma['White/100%'] ||
    figma['Monobrand/White/100%'] ||
    figma['Monobrand/main color/text'];
  const colorAccent = figma['Monobrand/accent/100%'];

  const headingFamily = headingFont?.family;
  const bodyFamily = bodyFont?.family;
  const headingWeight = headingFont ? styleToWeight(headingFont.style) : null;
  const bodyWeight = bodyFont ? styleToWeight(bodyFont.style) : null;

  const tokens = [];
  const push = (name, value) => {
    if (value === undefined || value === null || value === '') return;
    tokens.push([name, value]);
  };

  push('--main-bg', colorBg);
  push('--bg-section-second', colorFirst);
  push('--bg-red-gradient', colorFirst);
  push('--bg-footer', colorFooter);

  push('--color-white', colorWhite);
  push('--color-black', colorText);

  push('--table-head', colorFirst);
  push('--table-body', colorSecond);
  push('--payments-table-head', colorFirst);
  push('--payments-table-body', colorSecond);
  push('--table-head-color', colorText);
  push('--table-body-color', colorText);

  push('--button-primary-color', colorFirst);

  push('--color-purple', colorAccent);
  push('--border-yellow', colorAccent);

  push('--welcome-bonus-color', colorText);
  push('--bonus-section-text', colorText);
  push('--top-casino-text-color', colorText);
  push('--top-games-text-color', colorText);
  push('--faq-question-color', colorText);
  push('--faq-text-color', colorText);
  push('--support-text-color', colorText);
  push('--last-text-color', colorText);

  if (headingFamily) push('--font-family-main', quote(headingFamily));
  if (bodyFamily) push('--font-family-second', quote(bodyFamily));
  if (headingWeight !== null) push('--font-weight-main', String(headingWeight));
  if (headingWeight !== null)
    push('--font-weight-second', String(headingWeight));
  if (bodyWeight !== null) push('--font-weight-500', String(bodyWeight));

  if (h1) push('--font-size-h1', `${h1.size}px`);
  if (h2) push('--font-size-h2', `${h2.size}px`);
  if (h3) push('--font-size-h3', `${h3.size}px`);
  if (h4) push('--font-size-h4', `${h4.size}px`);
  if (h5) push('--font-size-h5', `${h5.size}px`);
  if (body20) push('--font-size-body-20', `${body20.size}px`);
  if (body24) push('--font-size-body-24', `${body24.size}px`);

  const lines = tokens.map(([k, v]) => `  ${k}: ${v};`);
  const out = `:root {\n${lines.join('\n')}\n}\n`;
  fs.writeFileSync(OUT_CSS, out, 'utf8');
  console.log('Wrote', OUT_CSS);
}

main();
