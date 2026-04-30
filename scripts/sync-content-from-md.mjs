import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkStringify from 'remark-stringify';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT = path.join(__dirname, '..');
const CONTENT_MD = path.join(PROJECT, 'content.md');
const URL_TXT = path.join(PROJECT, 'url.txt');
const DATA = path.join(PROJECT, 'src', 'app', 'data');
const ROBOTS_TXT = path.join(PROJECT, 'public', 'robots.txt');
const SITEMAP_XML = path.join(PROJECT, 'public', 'sitemap.xml');

const stringify = unified().use(remarkStringify).use(remarkGfm);

function serializeNode(node) {
  if (!node) return '';
  return stringify.stringify({ type: 'root', children: [node] }).trim();
}

function sliceRaw(body, node) {
  if (!node?.position) return null;
  return body.slice(node.position.start.offset, node.position.end.offset);
}

function paragraphText(body, node) {
  const raw = sliceRaw(body, node);
  if (raw !== null) return raw.trim();
  return serializeNode(node);
}

function listItemText(body, li) {
  const raw = sliceRaw(body, li);
  if (raw === null) {
    return li.children.map((c) => serializeNode(c)).join('\n');
  }
  return raw
    .replace(/^\s*[*+-]\s+/, '')
    .replace(/^\s*\d+\.\s+/, '')
    .trim();
}

function headingPlainText(h) {
  if (!h || h.type !== 'heading') return '';
  return stringify.stringify({ type: 'root', children: h.children }).trim();
}

function h1TitleFromRaw(body, h1) {
  const raw = sliceRaw(body, h1);
  if (raw === null) return headingPlainText(h1);
  return raw.replace(/^#\s+/, '').trim();
}

function headingBodyFromRaw(body, node) {
  const raw = sliceRaw(body, node);
  if (raw !== null) return raw.replace(/^#{1,6}\s+/, '').trim();
  return headingPlainText(node);
}

function extractMeta(raw) {
  const titleRe = /^\*\*(?:Title|Τίτλος):\*\*\s*(.+)$/m;
  const descRe = /^\*\*(?:Description|Περιγραφή):\*\*\s*(.+)$/m;
  let title = '';
  let description = '';
  const tm = raw.match(titleRe);
  const dm = raw.match(descRe);
  if (tm) title = tm[1].trim();
  if (dm) description = dm[1].trim();
  const body = raw
    .replace(/^\*\*(?:Title|Τίτλος):\*\*\s*.+$/m, '')
    .replace(/^\*\*(?:Description|Περιγραφή):\*\*\s*.+$/m, '')
    .replace(/^\s*\n/, '');
  return { title, description, body };
}

function ogSiteNameFromTitle(seoTitle) {
  const normalized = seoTitle.replace(/\\([+\-|])/g, '$1');
  const idx = normalized.indexOf(' - ');
  return idx === -1 ? normalized.trim() : normalized.slice(0, idx).trim();
}

function parseMd(body) {
  return unified().use(remarkParse).use(remarkGfm).parse(body);
}

function splitByH2(root) {
  const sections = [];
  let preamble = [];
  let current = null;
  for (const child of root.children) {
    if (child.type === 'heading' && child.depth === 2) {
      if (current) sections.push(current);
      current = { title: headingPlainText(child), nodes: [] };
    } else if (current) {
      current.nodes.push(child);
    } else {
      preamble.push(child);
    }
  }
  if (current) sections.push(current);
  return { preamble, sections };
}

function splitByH3(nodes) {
  const blocks = [];
  let current = { heading: null, nodes: [] };
  for (const node of nodes) {
    if (node.type === 'heading' && node.depth === 3) {
      blocks.push({ heading: current.heading, nodes: current.nodes });
      current = { heading: headingPlainText(node), nodes: [] };
    } else {
      current.nodes.push(node);
    }
  }
  blocks.push({ heading: current.heading, nodes: current.nodes });
  return blocks;
}

function stripTableCell(raw) {
  let s = raw.trim();
  if (s.startsWith('|')) s = s.slice(1).trim();
  if (s.endsWith('|')) s = s.slice(0, -1).trim();
  return s;
}

function tableToTableItem(table, body) {
  const rows = table.children.map((row) =>
    row.children.map((cell) => {
      const raw = sliceRaw(body, cell);
      if (raw !== null) return stripTableCell(raw);
      return stringify
        .stringify({ type: 'root', children: cell.children })
        .trim();
    })
  );
  if (rows.length === 0) return { type: 'table', headers: [], rows: [] };
  return {
    type: 'table',
    headers: rows[0],
    rows: rows.slice(1),
  };
}

function nodesToContentItems(nodes, body) {
  const items = [];
  for (const node of nodes) {
    if (node.type === 'paragraph') {
      items.push({ type: 'paragraph', text: paragraphText(body, node) });
    } else if (node.type === 'heading' && node.depth >= 2 && node.depth <= 4) {
      items.push({
        type: 'heading',
        level: node.depth,
        text: headingBodyFromRaw(body, node),
      });
    } else if (node.type === 'list') {
      const listItems = node.children.map((li) => listItemText(body, li));
      items.push({
        type: node.ordered ? 'list-number' : 'list-dotted',
        items: listItems,
      });
    } else if (node.type === 'table') {
      items.push(tableToTableItem(node, body));
    }
  }
  return items;
}

function parsePreamble(preamble, body) {
  let h1Title = '';
  const introNodes = [];
  for (const child of preamble) {
    if (child.type === 'heading' && child.depth === 1) {
      h1Title = h1TitleFromRaw(body, child);
    } else {
      introNodes.push(child);
    }
  }
  return { h1Title, introNodes };
}

function buildGameLibrary(nodes, body) {
  const blocks = splitByH3(nodes);
  let introNodes = [];
  const subsections = [];
  for (const b of blocks) {
    if (b.heading === null) {
      introNodes = b.nodes;
    } else {
      subsections.push({
        heading: b.heading,
        content: nodesToContentItems(b.nodes, body),
      });
    }
  }
  return { introNodes, subsections };
}

function buildBonuses(nodes, body) {
  const blocks = splitByH3(nodes);
  let introNodes = [];
  const sections = [];
  for (const b of blocks) {
    if (b.heading === null) {
      introNodes = b.nodes;
    } else {
      sections.push({
        heading: b.heading,
        content: nodesToContentItems(b.nodes, body),
      });
    }
  }
  return {
    title: 'Bonuses and Promotions',
    content: nodesToContentItems(introNodes, body),
    sections,
  };
}

function buildFaq(nodes, body) {
  const blocks = splitByH3(nodes).filter(
    (b) => b.heading || b.nodes.length > 0
  );
  const faqList = [];
  for (const b of blocks) {
    if (!b.heading) continue;
    const paras = nodesToContentItems(b.nodes, body).filter(
      (i) => i.type === 'paragraph'
    );
    const text = paras.map((p) => p.text).join('\n\n');
    faqList.push({ title: b.heading, text });
  }
  return { title: 'FAQ', faqList };
}

/** First tab: all nodes until the first ### that is Languages or Currencies (not included). */
function nodesUntilLangOrCurrencyH3(
  nodes,
  langHeadingAliases,
  currencyHeadingAliases
) {
  const stop = new Set([
    ...langHeadingAliases.map(normalizeHeading),
    ...currencyHeadingAliases.map(normalizeHeading),
  ]);
  const result = [];
  for (const node of nodes) {
    if (node.type === 'heading' && node.depth === 3) {
      const key = normalizeHeading(headingPlainText(node));
      if (stop.has(key)) break;
    }
    result.push(node);
  }
  return result;
}

/** Plain heading text of the first ### in `nodes` matching any alias (for tab labels). */
function firstH3HeadingTextMatching(nodes, body, headingAliases, options = {}) {
  const targets = new Set(headingAliases.map(normalizeHeading));
  for (const n of nodes) {
    if (n.type !== 'heading' || n.depth !== 3) continue;
    if (targets.has(normalizeHeading(headingPlainText(n)))) {
      return headingBodyFromRaw(body, n);
    }
  }
  if (options.containsKeyword) {
    const re = new RegExp(`\\b${options.containsKeyword}\\b`);
    for (const n of nodes) {
      if (n.type !== 'heading' || n.depth !== 3) continue;
      if (re.test(normalizeHeading(headingPlainText(n)))) {
        return headingBodyFromRaw(body, n);
      }
    }
  }
  return '';
}

function normalizeHeading(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\u0370-\u03ff]+/g, ' ')
    .trim();
}

function buildTitleAliases() {
  return {
    aboutPlatform: [
      'σχετικα με την πλατφορμα μας',
      'who we are and what drives us',
    ],
    strengths: ['πλεονεκτηματα και μειονεκτηματα', 'strengths and limitations'],
    gettingStarted: [
      'πως να εγγραφειτε και να συνδεθειτε',
      'getting started on the platform',
    ],
    managingMoney: ['καταθεσεις και αναληψεις', 'managing your money'],
    app: [
      'εφαρμογη και εκδοση για κινητα',
      'mobile gaming at odinfortune',
      'mobile gaming',
      'playing on the go',
    ],
    currencies: [
      'νομισματα',
      'currencies we support',
      'supported currencies',
      'accepted currencies',
    ],
    languages: [
      'διαθεσιμες γλωσσες',
      'languages available',
      'available languages',
    ],
    faq: ['συχνεσ ερωτησεις', 'frequently asked questions'],
    gameLibrary: [
      'παιχνιδια',
      'our game library',
      'richard branson casino royale online games',
    ],
    support: [
      'υποστηριξη',
      'customer support',
      'player support and responsible gaming',
    ],
    bonuses: ['μπονους και προσφορες', 'bonuses and promotions'],
    license: ['σημειωση για την αδεια', 'license note'],
  };
}

function resolveSection(sections, aliases, fallbackIndex, options = {}) {
  const normalizedAliases = aliases.map(normalizeHeading);
  const byTitle = sections.find((section) =>
    normalizedAliases.includes(normalizeHeading(section.title))
  );
  if (byTitle) return byTitle;
  if (options.containsKeyword) {
    const re = new RegExp(`\\b${options.containsKeyword}\\b`);
    const byKeyword = sections.find((section) =>
      re.test(normalizeHeading(section.title))
    );
    if (byKeyword) return byKeyword;
  }
  return sections[fallbackIndex] || null;
}

function resolveSectionByHeadingOnly(sections, aliases) {
  const normalizedAliases = aliases.map(normalizeHeading);
  return (
    sections.find((section) =>
      normalizedAliases.includes(normalizeHeading(section.title))
    ) || null
  );
}

/** Nodes under the first ### in `nodes` whose heading matches any alias (until next ###). */
function extractH3SubsectionNodes(nodes, headingAliases, options = {}) {
  const targets = new Set(headingAliases.map(normalizeHeading));
  const collectFrom = (i) => {
    const out = [];
    for (let j = i + 1; j < nodes.length; j++) {
      const m = nodes[j];
      if (m.type === 'heading' && m.depth === 3) break;
      out.push(m);
    }
    return out;
  };
  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i];
    if (n.type !== 'heading' || n.depth !== 3) continue;
    if (targets.has(normalizeHeading(headingPlainText(n))))
      return collectFrom(i);
  }
  if (options.containsKeyword) {
    const re = new RegExp(`\\b${options.containsKeyword}\\b`);
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      if (n.type !== 'heading' || n.depth !== 3) continue;
      if (re.test(normalizeHeading(headingPlainText(n)))) return collectFrom(i);
    }
  }
  return [];
}

function readUrlLocale() {
  if (!fs.existsSync(URL_TXT)) {
    return { url: '', locale: 'en-GB', brand: '' };
  }
  const lines = fs
    .readFileSync(URL_TXT, 'utf8')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  return {
    url: lines[0] || '',
    locale: lines[1] || 'en-GB',
    brand: lines[2] || '',
  };
}

function seoTitleBeforeColon(seoTitle) {
  if (!seoTitle) return '';
  const idx = seoTitle.indexOf(':');
  if (idx === -1) return seoTitle.trim();
  return seoTitle.slice(0, idx).trim();
}

function languageFromLocale(locale) {
  const languageCode = (locale || 'en').split('-')[0].toLowerCase();
  const map = {
    el: 'Greek',
    en: 'English',
    de: 'German',
    fr: 'French',
    es: 'Spanish',
    it: 'Italian',
    pt: 'Portuguese',
    ru: 'Russian',
    tr: 'Turkish',
  };
  return map[languageCode] || 'English';
}

function writeJson(name, data) {
  const p = path.join(DATA, name);
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log('Wrote', p);
}

function normalizeDomain(url) {
  if (!url) return '';
  return url.replace(/^https?:\/\//i, '').replace(/\/+$/, '');
}

function writePublicSeoFiles(url) {
  const domain = normalizeDomain(url);
  const baseUrl = domain ? `https://${domain}` : '';

  const robotsLines = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /casino/',
    `Host: ${baseUrl}/`,
    `Sitemap: ${baseUrl}/sitemap.xml`,
    '',
  ];
  fs.writeFileSync(ROBOTS_TXT, robotsLines.join('\n'), 'utf8');
  console.log('Wrote', ROBOTS_TXT);

  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    '  <url>',
    `    <loc>${baseUrl}/</loc>`,
    '  </url>',
    '</urlset>',
    '',
  ].join('\n');
  fs.writeFileSync(SITEMAP_XML, sitemap, 'utf8');
  console.log('Wrote', SITEMAP_XML);
}

function main() {
  const raw = fs.readFileSync(CONTENT_MD, 'utf8');
  const {
    title: metaTitle,
    description: metaDescription,
    body,
  } = extractMeta(raw);
  const tree = parseMd(body);
  const { preamble, sections } = splitByH2(tree);
  const { h1Title, introNodes } = parsePreamble(preamble, body);
  const aliases = buildTitleAliases();
  const by = {
    aboutPlatform: resolveSection(sections, aliases.aboutPlatform, 0),
    strengths: resolveSection(sections, aliases.strengths, 1),
    gettingStarted: resolveSection(sections, aliases.gettingStarted, 2),
    managingMoney: resolveSection(sections, aliases.managingMoney, 3),
    app: resolveSection(sections, aliases.app, 4),
    currencies: resolveSectionByHeadingOnly(sections, aliases.currencies),
    languages: resolveSectionByHeadingOnly(sections, aliases.languages),
    faq: resolveSection(sections, aliases.faq, 7),
    gameLibrary: resolveSection(sections, aliases.gameLibrary, 8, {
      containsKeyword: 'games',
    }),
    support: resolveSection(sections, aliases.support, 6),
    bonuses: resolveSection(sections, aliases.bonuses, 10),
    license: resolveSection(sections, aliases.license, 11),
  };

  const { url, locale, brand } = readUrlLocale();
  const ogSiteName = ogSiteNameFromTitle(metaTitle || h1Title || '');
  const brandName = brand || ogSiteName || h1Title;
  const language = languageFromLocale(locale);

  const siteMeta = {
    title: metaTitle,
    description: metaDescription,
    url,
    locale,
    language,
    ogSiteName,
    ogImagePath: '/og-img.webp',
    h1: h1Title,
  };
  writeJson('siteMeta.json', siteMeta);

  const whoWeAre = by.aboutPlatform?.nodes || [];
  const whoWeAreHeading =
    by.aboutPlatform?.title || 'Who We Are and What Drives Us';

  writeJson('dataCasinoIntro.json', {
    title: brandName,
    image: {
      src: '/sectionImg/slot3.webp',
      alt: brandName,
    },
    highlights: [],
    content: nodesToContentItems(introNodes, body),
    whoWeAre: {
      heading: whoWeAreHeading,
      content: nodesToContentItems(whoWeAre, body),
    },
  });

  const strengths = by.strengths?.nodes || [];
  const strengthsHeading = by.strengths?.title || 'Strengths and Limitations';
  const gettingStarted = by.gettingStarted?.nodes || [];
  const gettingStartedHeading =
    by.gettingStarted?.title || 'Getting Started on the Platform';
  const managing = by.managingMoney?.nodes || [];
  const managingHeading = by.managingMoney?.title || 'Managing Your Money';
  const license = by.license;

  const casinoInfoSections = [
    {
      heading: gettingStartedHeading,
      content: nodesToContentItems(gettingStarted, body),
    },
    {
      heading: managingHeading,
      content: nodesToContentItems(managing, body),
    },
  ];
  if (license) {
    casinoInfoSections.push({
      heading: license.title,
      content: nodesToContentItems(license.nodes, body),
    });
  }

  writeJson('dataCasinoInfo.json', {
    title: seoTitleBeforeColon(metaTitle) || 'About ' + brandName,
    sections: casinoInfoSections,
  });

  const mobile = by.app?.nodes || [];
  const langH3Aliases = ['available languages', ...aliases.languages];
  const currH3Aliases = ['supported currencies', ...aliases.currencies];

  const appPrimaryNodes = nodesUntilLangOrCurrencyH3(
    mobile,
    langH3Aliases,
    currH3Aliases
  );
  const mobileHeading = by.app?.title || 'Mobile Gaming';

  const langsFromAppH3 = extractH3SubsectionNodes(mobile, langH3Aliases, {
    containsKeyword: 'languages',
  });
  const langsNodes =
    langsFromAppH3.length > 0 ? langsFromAppH3 : by.languages?.nodes || [];

  const cursFromAppH3 = extractH3SubsectionNodes(mobile, currH3Aliases, {
    containsKeyword: 'currencies',
  });
  const cursNodes =
    cursFromAppH3.length > 0 ? cursFromAppH3 : by.currencies?.nodes || [];

  const langsHeading =
    firstH3HeadingTextMatching(mobile, body, langH3Aliases, {
      containsKeyword: 'languages',
    }) ||
    by.languages?.title ||
    'Available Languages';
  const cursHeading =
    firstH3HeadingTextMatching(mobile, body, currH3Aliases, {
      containsKeyword: 'currencies',
    }) ||
    by.currencies?.title ||
    'Supported Currencies';

  writeJson('dataApp.json', {
    title: brandName + ' App',
    sections: [
      {
        heading: mobileHeading,
        content: nodesToContentItems(appPrimaryNodes, body),
      },
      {
        heading: langsHeading,
        content: nodesToContentItems(langsNodes, body),
      },
      {
        heading: cursHeading,
        content: nodesToContentItems(cursNodes, body),
      },
    ],
  });

  const gameLib = by.gameLibrary?.nodes || [];
  const gameLibTitle = by.gameLibrary?.title || 'Our Game Library';
  const gl = buildGameLibrary(gameLib, body);
  writeJson('dataAfterSupport.json', {
    title: gameLibTitle,
    content: nodesToContentItems(gl.introNodes, body),
    sections: gl.subsections,
  });

  const support = by.support?.nodes || [];
  const supportTitle =
    by.support?.title || 'Player Support and Responsible Gaming';
  writeJson('dataSupport.json', {
    title: supportTitle,
    content: nodesToContentItems(support, body),
  });

  const bonuses = by.bonuses?.nodes || [];
  const bonusesData = buildBonuses(bonuses, body);
  bonusesData.title = by.bonuses?.title || bonusesData.title;
  writeJson('dataAfterFaq.json', bonusesData);

  const faq = by.faq?.nodes || [];
  const faqData = buildFaq(faq, body);
  faqData.title = by.faq?.title || faqData.title;
  writeJson('dataFaq.json', faqData);

  writeJson('dataLast.json', {
    title: strengthsHeading,
    content: nodesToContentItems(strengths, body),
  });

  writeJson('dataFooter.json', {
    title: brandName,
  });

  writePublicSeoFiles(url);

  console.log('Done.');
}

main();
