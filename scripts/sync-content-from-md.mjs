import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkStringify from 'remark-stringify';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT = path.join(__dirname, '..');
const DATA = path.join(PROJECT, 'src', 'app', 'data');
const PAGES_DATA = path.join(DATA, 'pages');

const PAGE_FILES = {
  faq: 'faq.md',
  terms: 'terms.md',
  privacy: 'privacy.md',
};

const stringify = unified().use(remarkStringify).use(remarkGfm);

function normalizeMdText(s) {
  return s.replace(/\\([+\-|.])/g, '$1');
}

function plainContentText(s) {
  let t = normalizeMdText(s);
  for (let i = 0; i < 20; i++) {
    const next = t
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/__([^_]+)__/g, '$1');
    if (next === t) break;
    t = next;
  }
  t = t.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');
  t = t.replace(/`([^`]+)`/g, '$1');
  t = t.replace(/\*([^*]+)\*/g, '$1');
  return t.trim();
}

function preprocessMd(raw) {
  return raw
    .replace(/^\s*\*?\s*All about [^\n]+\*?\s*$/gm, '')
    .replace(/\\$/gm, '')
    .replace(/\n{3,}/g, '\n\n');
}

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
  if (raw !== null) return normalizeMdText(raw.trim());
  return normalizeMdText(serializeNode(node));
}

function listItemText(body, li) {
  const raw = sliceRaw(body, li);
  if (raw === null) {
    return li.children.map((c) => serializeNode(c)).join('\n');
  }
  return normalizeMdText(
    raw
      .replace(/^\s*[*+-]\s+/, '')
      .replace(/^\s*\d+\.\s+/, '')
      .trim()
  );
}

function headingPlainText(h) {
  if (!h || h.type !== 'heading') return '';
  return normalizeMdText(
    stringify.stringify({ type: 'root', children: h.children }).trim()
  );
}

function h1TitleFromRaw(body, h1) {
  const raw = sliceRaw(body, h1);
  if (raw === null) return headingPlainText(h1);
  return normalizeMdText(raw.replace(/^#\s+/, '').trim());
}

function headingBodyFromRaw(body, node) {
  const raw = sliceRaw(body, node);
  if (raw !== null)
    return normalizeMdText(raw.replace(/^#{1,6}\s+/, '').trim());
  return headingPlainText(node);
}

function extractMeta(raw) {
  const titleRe = /^\*\*Title:\*\*\s*(.+)$/m;
  const descRe = /^\*\*Description:\*\*\s*(.+)$/m;
  let title = '';
  let description = '';
  const tm = raw.match(titleRe);
  const dm = raw.match(descRe);
  if (tm) title = normalizeMdText(tm[1].trim());
  if (dm) description = normalizeMdText(dm[1].trim());
  const body = raw
    .replace(/^\*\*Title:\*\*\s*.+$/m, '')
    .replace(/^\*\*Description:\*\*\s*.+$/m, '')
    .replace(/^\s*\n/, '');
  return { title, description, body };
}

function ogSiteNameFromTitle(seoTitle) {
  const idx = seoTitle.indexOf(' - ');
  return idx === -1 ? seoTitle.trim() : seoTitle.slice(0, idx).trim();
}

function h2FromH1(h1) {
  const t = plainContentText(h1);
  const idx = t.indexOf(' - ');
  return idx === -1 ? t : t.slice(0, idx).trim();
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
  let s = normalizeMdText(raw.trim());
  if (s.startsWith('|')) s = s.slice(1).trim();
  if (s.endsWith('|')) s = s.slice(0, -1).trim();
  if (s === '-' || s === '\\-' || s === '- ') return '-';
  return plainContentText(s);
}

function tableToTableItem(table, body) {
  const rows = table.children.map((row) =>
    row.children.map((cell) => {
      const raw = sliceRaw(body, cell);
      if (raw !== null) return stripTableCell(raw);
      return plainContentText(
        normalizeMdText(
          stringify.stringify({ type: 'root', children: cell.children }).trim()
        )
      );
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
      items.push({
        type: 'paragraph',
        text: plainContentText(paragraphText(body, node)),
      });
    } else if (node.type === 'heading' && node.depth >= 3 && node.depth <= 4) {
      items.push({
        type: 'heading',
        level: node.depth,
        text: plainContentText(headingBodyFromRaw(body, node)),
      });
    } else if (node.type === 'list') {
      const listItems = node.children.map((li) =>
        plainContentText(listItemText(body, li))
      );
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

function sectionMap(sections) {
  const m = new Map();
  for (const s of sections) {
    m.set(s.title, s.nodes);
  }
  return m;
}

function isFaqSection(title) {
  return /\bFAQ/i.test(title.trim());
}

function buildFaqFromNodes(nodes, body) {
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
    faqList.push({
      title: plainContentText(b.heading),
      text: plainContentText(text),
    });
  }
  return faqList;
}

function buildFaqFromH3Blocks(nodes, body) {
  const faqList = [];
  let current = null;
  let currentNodes = [];

  const flush = () => {
    if (!current) return;
    const paras = nodesToContentItems(currentNodes, body).filter(
      (i) => i.type === 'paragraph'
    );
    const text = paras.map((p) => p.text).join('\n\n');
    faqList.push({
      title: plainContentText(current),
      text: plainContentText(text),
    });
    current = null;
    currentNodes = [];
  };

  for (const node of nodes) {
    if (node.type === 'heading' && node.depth === 3) {
      flush();
      current = plainContentText(headingPlainText(node));
    } else if (current) {
      currentNodes.push(node);
    }
  }
  flush();
  return faqList;
}

function buildPageJson(raw, slug) {
  const preprocessed = preprocessMd(raw);
  const {
    title: metaTitle,
    description: metaDescription,
    body,
  } = extractMeta(preprocessed);
  const tree = parseMd(body);
  const { preamble, sections } = splitByH2(tree);

  let h1Title = '';
  let intro = [];
  let pageSections = [];
  let faq = null;

  const hasH1 = preamble.some((n) => n.type === 'heading' && n.depth === 1);

  if (slug === 'faq') {
    const parsed = parsePreamble(preamble, body);
    h1Title = parsed.h1Title;
    intro = nodesToContentItems(parsed.introNodes, body);
    faq = sections.map((section) => {
      const paras = nodesToContentItems(section.nodes, body).filter(
        (i) => i.type === 'paragraph'
      );
      return {
        title: plainContentText(section.title),
        text: plainContentText(paras.map((p) => p.text).join('\n\n')),
      };
    });
  } else if (!hasH1 && sections.length > 0) {
    const first = sections[0];
    h1Title = plainContentText(first.title);
    intro = nodesToContentItems(first.nodes, body);
    pageSections = sections.slice(1);
  } else {
    const parsed = parsePreamble(preamble, body);
    h1Title = parsed.h1Title;
    intro = nodesToContentItems(parsed.introNodes, body);
    pageSections = sections;
  }

  const contentSections = [];
  for (const section of pageSections) {
    if (isFaqSection(section.title)) {
      faq = buildFaqFromNodes(section.nodes, body);
      continue;
    }
    contentSections.push({
      heading: plainContentText(section.title),
      content: nodesToContentItems(section.nodes, body),
    });
  }

  return {
    meta: { title: metaTitle, description: metaDescription },
    h1: plainContentText(h1Title),
    h2: h2FromH1(h1Title),
    intro,
    sections: contentSections,
    faq,
  };
}

function extractHomeFaqFromProsCons(nodes, body) {
  const faqNodes = [];
  let afterFaq = false;

  for (const node of nodes) {
    if (node.type === 'heading' && node.depth === 3) {
      const heading = plainContentText(headingPlainText(node));
      if (/^faq$/i.test(heading)) {
        afterFaq = true;
        continue;
      }
      if (afterFaq) {
        faqNodes.push(node);
      }
    } else if (afterFaq) {
      faqNodes.push(node);
    }
  }

  return buildFaqFromH3Blocks(faqNodes, body);
}

function buildSectionWithH3Blocks(nodes, body, sectionTitle) {
  const blocks = splitByH3(nodes);
  let intro = [];
  const sections = [];

  for (const b of blocks) {
    if (!b.heading) {
      intro = nodesToContentItems(b.nodes, body);
    } else {
      sections.push({
        heading: plainContentText(b.heading),
        content: nodesToContentItems(b.nodes, body),
      });
    }
  }

  return {
    title: plainContentText(sectionTitle),
    intro,
    sections,
  };
}

function buildRegistrationSection(nodes, body) {
  const blocks = splitByH3(nodes);
  let intro = [];
  const cards = [];

  for (const b of blocks) {
    if (!b.heading) {
      intro = nodesToContentItems(b.nodes, body);
    } else {
      cards.push({
        heading: plainContentText(b.heading),
        content: nodesToContentItems(b.nodes, body),
      });
    }
  }

  return {
    title: 'Registration & Login',
    intro,
    cards,
  };
}

function buildFlatSection(nodes, body, sectionTitle) {
  return {
    title: plainContentText(sectionTitle),
    content: nodesToContentItems(nodes, body),
  };
}

function buildProsConsSection(nodes, body, sectionTitle) {
  const blocks = splitByH3(nodes);
  let intro = [];
  let pros = { heading: 'Pros', text: '', items: [] };
  let cons = { heading: 'Cons', text: '', items: [] };

  for (const b of blocks) {
    if (!b.heading) {
      intro = nodesToContentItems(b.nodes, body).filter(
        (i) => i.type === 'paragraph'
      );
      continue;
    }
    const heading = plainContentText(b.heading);
    if (/^faq$/i.test(heading)) continue;
    const blockItems = nodesToContentItems(b.nodes, body);
    const paragraphs = blockItems.filter((i) => i.type === 'paragraph');
    const list = blockItems.find((i) => i.type === 'list-dotted');
    const text = paragraphs.map((p) => p.text).join('\n\n');
    if (/^pros$/i.test(heading)) {
      pros = { heading, text, items: list?.items ?? [] };
    } else if (/^cons$/i.test(heading)) {
      cons = { heading, text, items: list?.items ?? [] };
    }
  }

  return {
    title: plainContentText(sectionTitle),
    intro,
    fit: pros,
    notFit: cons,
  };
}

function buildSiteUi() {
  return {
    playNow: 'Play Now',
    welcome_section: {
      welcome_offer: 'Exclusive welcome offer of',
      button: 'Claim Bonus',
    },
    topCasino_section: {
      top_casinos: 'Top Casinos',
      claim_bonus: 'Claim Bonus',
      welcome_bonus: 'Welcome bonus',
      all_casinos: 'All casino',
    },
    topGames_section: {
      top_games: 'Top Games',
      all_games: 'All Games',
      play_now: 'Play Now',
      previous_games: 'Previous games',
      next_games: 'Next games',
      swipe_to_change_page: 'Swipe to change game page',
      game_pages: 'Game pages',
      page_label: 'Page {page}',
    },
    notFoundPage: {
      textOne: 'The page you were looking for does not exist.',
      textTwo: 'You may have mistyped the address or the page may have moved.',
      back: 'Home Page',
    },
    appSection: {
      title: 'Languages & Currencies',
    },
  };
}

function writeJson(relPath, data) {
  const p = path.join(DATA, relPath);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log('Wrote', p);
}

function main() {
  const mainRaw = fs.readFileSync(path.join(PROJECT, 'main.md'), 'utf8');
  const preprocessed = preprocessMd(mainRaw);
  const {
    title: metaTitle,
    description: metaDescription,
    body,
  } = extractMeta(preprocessed);
  const tree = parseMd(body);
  const { preamble, sections } = splitByH2(tree);
  const { h1Title, introNodes } = parsePreamble(preamble, body);
  const by = sectionMap(sections);
  const ogSiteName = ogSiteNameFromTitle(metaTitle);

  writeJson('siteMeta.json', {
    title: plainContentText(metaTitle),
    description: plainContentText(metaDescription),
    h1: plainContentText(h1Title),
    ogSiteName,
  });

  const aboutNodes = by.get('About Our Platform') || [];
  const introItems = nodesToContentItems(introNodes, body);
  const h1Plain = plainContentText(h1Title);
  const aboutTitle =
    h1Plain.indexOf(' - ') === -1
      ? h1Plain
      : h1Plain.slice(0, h1Plain.indexOf(' - ')).trim();
  writeJson('dataCasinoInfo.json', {
    title: aboutTitle,
    subtitle: 'About Our Platform',
    image: '/sectionImg/slot3.webp',
    intro: introItems.find((i) => i.type === 'paragraph') ??
      introItems[0] ?? { type: 'paragraph', text: '' },
    aboutParagraphs: nodesToContentItems(aboutNodes, body).filter(
      (i) => i.type === 'paragraph'
    ),
  });

  writeJson(
    'dataRegistration.json',
    buildRegistrationSection(by.get('Registration & Login') || [], body)
  );

  writeJson(
    'dataTransactions.json',
    buildFlatSection(by.get('Transactions') || [], body, 'Transactions')
  );

  writeJson(
    'dataMobileGaming.json',
    buildFlatSection(by.get('Mobile Gaming') || [], body, 'Mobile Gaming')
  );

  writeJson(
    'dataGames.json',
    buildSectionWithH3Blocks(by.get('Games') || [], body, 'Games')
  );

  writeJson(
    'dataLanguageCurrency.json',
    buildSectionWithH3Blocks(
      by.get('Language & Currency') || [],
      body,
      'Language & Currency'
    )
  );

  writeJson(
    'dataBonuses.json',
    buildSectionWithH3Blocks(by.get('Bonuses') || [], body, 'Bonuses')
  );

  const prosConsNodes = by.get('Pros & Cons') || [];
  writeJson(
    'dataInfoAfterSupport.json',
    buildProsConsSection(prosConsNodes, body, 'Pros & Cons')
  );

  writeJson('dataFaq.json', {
    title: 'FAQ',
    faqList: extractHomeFaqFromProsCons(prosConsNodes, body),
  });

  writeJson('dataFooter.json', { title: ogSiteName });
  writeJson('siteUi.json', buildSiteUi());

  for (const [slug, filename] of Object.entries(PAGE_FILES)) {
    const pageRaw = fs.readFileSync(path.join(PROJECT, filename), 'utf8');
    const pageJson = buildPageJson(pageRaw, slug);
    writeJson(`pages/${slug}.json`, pageJson);
  }

  console.log('Done.');
}

main();
