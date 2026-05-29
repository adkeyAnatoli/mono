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
  bonuses: 'bonuses.md',
  registration: 'registration.md',
  games: 'games.md',
  payments: 'payments.md',
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
  if (raw !== null) return normalizeMdText(raw.replace(/^#{1,6}\s+/, '').trim());
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
          stringify
            .stringify({ type: 'root', children: cell.children })
            .trim()
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
  const { title: metaTitle, description: metaDescription, body } =
    extractMeta(preprocessed);
  const tree = parseMd(body);
  const { preamble, sections } = splitByH2(tree);

  let h1Title = '';
  let intro = [];
  let pageSections = [];
  let faq = null;

  const hasH1 = preamble.some(
    (n) => n.type === 'heading' && n.depth === 1
  );

  if (slug === 'faq') {
    const parsed = parsePreamble(preamble, body);
    h1Title = parsed.h1Title;
    const introNodes = [];
    const faqNodes = [];
    let inFaq = false;
    for (const node of parsed.introNodes) {
      if (node.type === 'heading' && node.depth === 3) {
        inFaq = true;
      }
      if (inFaq) {
        faqNodes.push(node);
      } else {
        introNodes.push(node);
      }
    }
    intro = nodesToContentItems(introNodes, body);
    faq = buildFaqFromH3Blocks(faqNodes, body);
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

function buildInfoAfterSupport(nodes, body) {
  const audience = buildAudienceSection(nodes, body);
  return {
    title: audience.heading,
    fit: audience.fit,
    notFit: audience.notFit,
  };
}

function buildAudienceSection(nodes, body) {
  const items = nodesToContentItems(nodes, body);
  const paragraphs = items.filter((i) => i.type === 'paragraph');
  const lists = items.filter((i) => i.type === 'list-dotted');

  const fitHeading = plainContentText(
    paragraphs[0]?.text ?? 'You will find us a strong fit if:'
  );
  const notFitHeading = plainContentText(
    paragraphs[1]?.text ?? 'We are probably not the right match if:'
  );

  return {
    heading: 'Who Gets the Most from Klarna Online and Who Might Not',
    fit: {
      heading: fitHeading,
      items: lists[0]?.items ?? [],
    },
    notFit: {
      heading: notFitHeading,
      items: lists[1]?.items ?? [],
    },
  };
}

function buildLastSection(nodes, body) {
  const blocks = splitByH3(nodes);
  let introNodes = [];
  const tables = [];

  for (const b of blocks) {
    if (b.heading === null) {
      introNodes = b.nodes;
    } else {
      const content = nodesToContentItems(b.nodes, body);
      const tableItem = content.find((i) => i.type === 'table');
      if (tableItem) {
        tables.push({
          heading: plainContentText(b.heading),
          headers: tableItem.headers,
          rows: tableItem.rows,
        });
      }
    }
  }

  return {
    title: 'What Sets Us Apart',
    content: nodesToContentItems(introNodes, body),
    tables,
  };
}

function buildSupportSection(nodes, body) {
  const blocks = splitByH3(nodes);
  let mainNodes = [];
  const sections = [];

  for (const b of blocks) {
    if (b.heading === null) {
      mainNodes = b.nodes;
    } else {
      sections.push({
        heading: plainContentText(b.heading),
        content: nodesToContentItems(b.nodes, body),
      });
    }
  }

  return {
    title: 'How to Get Help When You Need It',
    content: nodesToContentItems(mainNodes, body),
    sections,
  };
}

function buildSiteUi() {
  return {
    nav: {
      bonuses: 'Bonuses',
      registration: 'Registration',
      games: 'Games',
      payments: 'Payment Methods',
    },
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
    title: metaTitle,
    description: metaDescription,
    h1: h1Title,
    ogSiteName,
  });

  const licenceNodes = by.get('Our Licence') || [];
  const introItems = nodesToContentItems(introNodes, body);
  writeJson('dataCasinoInfo.json', {
    subtitle: 'Our Licence',
    intro:
      introItems.find((i) => i.type === 'paragraph') ??
      introItems[0] ?? { type: 'paragraph', text: '' },
    aboutParagraphs: nodesToContentItems(licenceNodes, body).filter(
      (i) => i.type === 'paragraph'
    ),
  });

  const apartNodes = by.get('What Sets Us Apart') || [];
  const audienceNodes =
    by.get('Who Gets the Most from Klarna Online and Who Might Not') || [];
  writeJson('dataLast.json', buildLastSection(apartNodes, body));
  writeJson('dataInfoAfterSupport.json', buildInfoAfterSupport(audienceNodes, body));

  const langs = by.get('Languages Available on the Platform') || [];
  const curs = by.get('Currencies We Support') || [];
  writeJson('dataApp.json', {
    title: 'Languages & Currencies',
    sections: [
      {
        heading: 'Languages Available on the Platform',
        content: nodesToContentItems(langs, body),
      },
      {
        heading: 'Currencies We Support',
        content: nodesToContentItems(curs, body),
      },
    ],
  });

  const supportNodes = by.get('How to Get Help When You Need It') || [];
  writeJson('dataSupport.json', buildSupportSection(supportNodes, body));

  const faqNodes = by.get('Answers to the Questions We Hear Most') || [];
  writeJson('dataFaq.json', {
    title: 'Answers to the Questions We Hear Most',
    faqList: buildFaqFromH3Blocks(faqNodes, body),
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
