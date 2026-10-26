import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT = path.join(__dirname, '..');
const FIGMA_VARS = path.join(PROJECT, 'figma-variables.json');
const TOKENS_CSS = path.join(PROJECT, 'src', 'app', 'styles', 'tokens.css');

/**
 * Figma key → list of existing CSS custom properties in tokens.css.
 * Only values are replaced; no new variables are introduced.
 */
const COLOR_MAP = {
  'Monobrand/main color/BG': ['--main-bg', '--bg-red-gradient'],
  'Monobrand/White/100%': ['--bg-header', '--bg-footer'],
  'Monobrand/main color/first color': [
    '--bg-section-second',
    '--table-head',
    '--payments-table-head',
    '--software-provider-card-bg',
  ],
  'Monobrand/main color/second color': [
    '--color-white',
    '--table-body',
    '--payments-table-body',
  ],
  'Monobrand/main color/text': [
    '--color-black',
    '--table-head-color',
    '--table-body-color',
    '--last-text-color',
    '--top-casino-text-color',
    '--button-primary-color',
    '--faq-question-color',
    '--faq-text-color',
  ],
  'Monobrand/accent/100%': [
    '--color-purple',
    '--border-yellow',
    '--payments-text-left',
    '--button-primary-bg',
  ],
  'Monobrand/Button/Small': ['--button-secondary-bg'],
  'White/100%': [
    '--button-secondary-color',
    '--bonus-section-text',
    '--welcome-bonus-color',
    '--support-text-color',
    '--top-games-text-color',
  ],
};

const FIXED_VALUES = {
  '--after-element-second': 'rgba(0, 0, 0, 0.2)',
  '--font-family-main':
    "var(--font-helvetica), 'Helvetica', Arial, sans-serif",
  '--font-family-second': "var(--font-roboto), 'Roboto', sans-serif",
  '--font-weight-main': '700',
  '--font-weight-second': '700',
};

function normalizeHex(value) {
  if (typeof value !== 'string') return null;
  const m = value.trim().match(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/);
  if (!m) return null;
  let hex = m[1].toUpperCase();
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((c) => c + c)
      .join('');
  }
  return `#${hex}`;
}

function setCssVar(css, name, value) {
  const re = new RegExp(`(${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*:\\s*)([^;]+)(;)`);
  if (!re.test(css)) {
    console.warn(`Warning: token ${name} not found in tokens.css`);
    return css;
  }
  return css.replace(re, `$1${value}$3`);
}

function main() {
  if (!fs.existsSync(FIGMA_VARS)) {
    console.error('Missing figma-variables.json');
    process.exit(1);
  }

  const figma = JSON.parse(fs.readFileSync(FIGMA_VARS, 'utf8'));
  let css = fs.readFileSync(TOKENS_CSS, 'utf8');

  for (const [figmaKey, tokens] of Object.entries(COLOR_MAP)) {
    const raw = figma[figmaKey];
    if (raw == null) {
      console.warn(`Warning: Figma key missing: ${figmaKey}`);
      continue;
    }
    const hex = normalizeHex(raw);
    if (!hex) {
      console.warn(`Warning: invalid color for ${figmaKey}: ${raw}`);
      continue;
    }
    for (const token of tokens) {
      css = setCssVar(css, token, hex);
    }
  }

  const black20 = figma['Monobrand/Button/Black 20%'];
  if (black20 != null) {
    css = setCssVar(css, '--after-element-second', FIXED_VALUES['--after-element-second']);
  } else {
    console.warn('Warning: Figma key missing: Monobrand/Button/Black 20%');
  }

  for (const [token, value] of Object.entries(FIXED_VALUES)) {
    if (token === '--after-element-second') continue;
    css = setCssVar(css, token, value);
  }

  fs.writeFileSync(TOKENS_CSS, css, 'utf8');
  console.log('Wrote', TOKENS_CSS);
}

main();
