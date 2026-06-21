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
const DATA = path.join(PROJECT, 'src', 'app', 'data');

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

function h2FromH1(h1) {
  const t = plainContentText(h1);
  const idx = t.indexOf(' - ');
  return idx === -1 ? t : t.slice(0, idx).trim();
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
  const titleRe = /^\*\*Title:\*\*\s*(.+)$/m;
  const descRe = /^\*\*Description:\*\*\s*(.+)$/m;
  let title = '';
  let description = '';
  const tm = raw.match(titleRe);
  const dm = raw.match(descRe);
  if (tm) title = tm[1].trim();
  if (dm) description = dm[1].trim();
  const body = raw
    .replace(/^\*\*Title:\*\*\s*.+$/m, '')
    .replace(/^\*\*Description:\*\*\s*.+$/m, '')
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

function sectionMap(sections) {
  const m = new Map();
  for (const s of sections) {
    m.set(s.title, s.nodes);
  }
  return m;
}

function buildSectionWithH3Blocks(nodes, body, sectionTitle) {
  const blocks = splitByH3(nodes);
  let introNodes = [];
  const sections = [];
  for (const b of blocks) {
    if (!b.heading) {
      introNodes = b.nodes;
    } else {
      sections.push({
        heading: b.heading,
        content: nodesToContentItems(b.nodes, body),
      });
    }
  }
  return {
    title: sectionTitle,
    content: nodesToContentItems(introNodes, body),
    sections,
  };
}

function buildMobileGamingApp(nodes, body) {
  const blocks = splitByH3(nodes);
  let introNodes = [];
  const h3Sections = [];
  for (const b of blocks) {
    if (!b.heading) {
      introNodes = b.nodes;
    } else {
      h3Sections.push({
        heading: b.heading,
        content: nodesToContentItems(b.nodes, body),
      });
    }
  }
  return {
    title: 'Mobile Gaming',
    sections: [
      {
        heading: 'Mobile Gaming',
        content: nodesToContentItems(introNodes, body),
      },
      ...h3Sections,
    ],
  };
}

function buildGamesFlat(nodes, body, sectionTitle) {
  return {
    title: sectionTitle,
    content: nodesToContentItems(nodes, body),
    sections: [],
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

function writeJson(name, data) {
  const p = path.join(DATA, name);
  fs.mkdirSync(path.dirname(p), { recursive: true });
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
  const by = sectionMap(sections);

  const ogSiteName = ogSiteNameFromTitle(metaTitle);

  writeJson('siteMeta.json', {
    title: metaTitle,
    description: metaDescription,
    url: 'santader-casino.com',
    ogSiteName,
    ogImagePath: '/og-img.webp',
    h1: h1Title,
  });

  const aboutNodes = by.get('About Our Platform') || [];

  writeJson('dataCasinoIntro.json', {
    title: ogSiteName,
    image: {
      src: '/sectionImg/slot3.webp',
      alt: ogSiteName + ' illustration',
    },
    highlights: [],
    content: nodesToContentItems(introNodes, body),
    whoWeAre: {
      heading: 'About Our Platform',
      content: nodesToContentItems(aboutNodes, body),
    },
  });

  writeJson('dataLast.json', {
    title: 'Strengths and Shortcomings',
    content: nodesToContentItems(
      by.get('Strengths and Shortcomings') || [],
      body
    ),
  });

  writeJson('dataCasinoInfo.json', {
    title: 'Banking & Priority',
    sections: [
      {
        heading: 'Banking',
        content: nodesToContentItems(by.get('Banking') || [], body),
      },
      {
        heading: 'Priority Status',
        content: nodesToContentItems(by.get('Priority Status') || [], body),
      },
    ],
  });

  writeJson(
    'dataApp.json',
    buildMobileGamingApp(by.get('Mobile Gaming') || [], body)
  );

  writeJson(
    'dataAfterSupport.json',
    buildGamesFlat(by.get('Games') || [], body, 'Games')
  );

  writeJson('dataSupport.json', {
    title: 'Casino Santander vs Starling UK',
    content: nodesToContentItems(
      by.get('Casino Santander vs Starling UK') || [],
      body
    ),
  });

  writeJson(
    'dataAfterFaq.json',
    buildSectionWithH3Blocks(
      by.get('Bonuses and Promotional Credit') || [],
      body,
      'Bonuses and Promotional Credit'
    )
  );

  writeJson('dataFaq.json', buildFaq(by.get('FAQ') || [], body));

  writeJson('dataFooter.json', {
    title: ogSiteName,
  });

  for (const [slug, filename] of Object.entries(PAGE_FILES)) {
    const pageRaw = fs.readFileSync(path.join(PROJECT, filename), 'utf8');
    const pageJson = buildPageJson(pageRaw, slug);
    writeJson(`pages/${slug}.json`, pageJson);
  }

  console.log('Done.');
}

main();
