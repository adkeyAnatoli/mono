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
    ],
    currencies: ['νομισματα', 'currencies we support'],
    languages: ['διαθεσιμες γλωσσες', 'languages available'],
    faq: ['συχνεσ ερωτησεις', 'frequently asked questions'],
    gameLibrary: ['παιχνιδια', 'our game library'],
    support: ['υποστηριξη', 'customer support'],
    bonuses: ['μπονους και προσφορες', 'bonuses and promotions'],
    license: ['σημειωση για την αδεια', 'license note'],
  };
}

function resolveSection(sections, aliases, fallbackIndex) {
  const normalizedAliases = aliases.map(normalizeHeading);
  const byTitle = sections.find((section) =>
    normalizedAliases.includes(normalizeHeading(section.title))
  );
  if (byTitle) return byTitle;
  return sections[fallbackIndex] || null;
}

function readUrlLocale() {
  if (!fs.existsSync(URL_TXT)) {
    return { url: '', locale: 'en-GB' };
  }
  const lines = fs
    .readFileSync(URL_TXT, 'utf8')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  return {
    url: lines[0] || '',
    locale: lines[1] || 'en-GB',
  };
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
    currencies: resolveSection(sections, aliases.currencies, 5),
    languages: resolveSection(sections, aliases.languages, 6),
    faq: resolveSection(sections, aliases.faq, 7),
    gameLibrary: resolveSection(sections, aliases.gameLibrary, 8),
    support: resolveSection(sections, aliases.support, 9),
    bonuses: resolveSection(sections, aliases.bonuses, 10),
    license: resolveSection(sections, aliases.license, 11),
  };

  const { url, locale } = readUrlLocale();
  const ogSiteName = ogSiteNameFromTitle(metaTitle || h1Title || '');
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
    title: ogSiteName || h1Title,
    image: {
      src: '/sectionImg/slot3.webp',
      alt: (ogSiteName || h1Title) + ' illustration',
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

  writeJson('dataCasinoInfo.json', {
    title: 'About ' + (ogSiteName || h1Title),
    sections: [
      {
        heading: gettingStartedHeading,
        content: nodesToContentItems(gettingStarted, body),
      },
      {
        heading: managingHeading,
        content: nodesToContentItems(managing, body),
      },
    ],
  });

  const mobile = by.app?.nodes || [];
  const mobileHeading = by.app?.title || 'Mobile Gaming';
  const langs = by.languages?.nodes || [];
  const langsHeading = by.languages?.title || 'Languages Available';
  const curs = by.currencies?.nodes || [];
  const cursHeading = by.currencies?.title || 'Currencies We Support';

  writeJson('dataApp.json', {
    title: (ogSiteName || h1Title) + ' App',
    sections: [
      {
        heading: mobileHeading,
        content: nodesToContentItems(mobile, body),
      },
      {
        heading: langsHeading,
        content: nodesToContentItems(langs, body),
      },
      {
        heading: cursHeading,
        content: nodesToContentItems(curs, body),
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
  const supportTitle = by.support?.title || 'Customer Support';
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

  const license = by.license;
  writeJson('dataAfterPayments.json', {
    sections: license
      ? [
          {
            heading: license.title,
            content: nodesToContentItems(license.nodes, body),
          },
        ]
      : [],
  });

  writeJson('dataLast.json', {
    title: strengthsHeading,
    content: nodesToContentItems(strengths, body),
  });

  writeJson('dataFooter.json', {
    title: ogSiteName || h1Title,
  });

  console.log('Done.');
}

main();
