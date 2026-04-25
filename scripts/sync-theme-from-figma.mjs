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

function stringifyTokenValue(value) {
  if (typeof value === 'number') return String(value);
  return value;
}

function main() {
  const raw = fs.readFileSync(FIGMA_VARS, 'utf8');
  const figma = JSON.parse(raw);

  const h1 = parseFontToken(figma['Desktop/H1']);
  const h2 = parseFontToken(figma['Desktop/H2']);
  const h3 = parseFontToken(figma['Desktop/H3']);
  const h4 = parseFontToken(figma['Desktop/H4']);
  const h5 = parseFontToken(figma['Desktop/H5']);
  const body20 = parseFontToken(figma['Desktop/B1-20']);
  const body24 = parseFontToken(figma['Desktop/B2-24']);

  const cssTokens = {
    '--figma-color-bg': figma['Monobrand/main color/BG'] || '#0B56C3',
    '--figma-color-first':
      figma['Monobrand/main color/first color'] || '#0C3C81',
    '--figma-color-second':
      figma['Monobrand/main color/second color'] || '#0C49A1',
    '--figma-color-footer':
      figma['Monobrand/main color/footer color'] || '#C9DFFF',
    '--figma-color-text': figma['Monobrand/main color/text'] || '#FFFFFF',
    '--figma-color-white': figma['White/100%'] || '#FFFFFF',
    '--figma-color-accent': figma['Monobrand/accent/100%'] || '#E35450',
    '--figma-button-shadow': figma['Monobrand/Button/Black 20%'] || '#000000',
    '--figma-font-heading-family': `"${h1?.family || 'Futura PT'}"`,
    '--figma-font-heading-size-h1': h1?.size ?? 44,
    '--figma-font-heading-size-h2': h2?.size ?? 40,
    '--figma-font-heading-size-h3': h3?.size ?? 32,
    '--figma-font-heading-size-h4': h4?.size ?? 24,
    '--figma-font-heading-size-h5': h5?.size ?? 24,
    '--figma-font-body-family': `"${body20?.family || 'Roboto'}"`,
    '--figma-font-body-size-20': body20?.size ?? 20,
    '--figma-font-body-size-24': body24?.size ?? 24,
  };

  const lines = Object.entries(cssTokens).map(
    ([key, value]) => `  ${key}: ${stringifyTokenValue(value)};`
  );

  const out = `:root {\n${lines.join('\n')}\n}\n`;
  fs.writeFileSync(OUT_CSS, out, 'utf8');
  console.log('Wrote', OUT_CSS);
}

main();
