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
const DATA = path.join(PROJECT, 'app', 'data');

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

function buildGettingStartedMainSections(nodes, body) {
  const blocks = splitByH3(nodes);
  const out = [];
  for (const b of blocks) {
    if (b.heading === null && b.nodes.length === 0) continue;
    const heading =
      b.heading === null ? 'Getting Started on the Platform' : b.heading;
    out.push({
      heading,
      content: nodesToContentItems(b.nodes, body),
    });
  }
  return out;
}

function buildManagingMoney(nodes, body) {
  const blocks = splitByH3(nodes);
  const afterPaymentsIntro = [];
  let deposit = null;
  let withdrawal = null;
  for (const b of blocks) {
    if (b.heading === null) {
      afterPaymentsIntro.push(...b.nodes);
    } else if (b.heading.startsWith('Depositing')) {
      deposit = {
        heading: b.heading,
        content: nodesToContentItems(b.nodes, body),
      };
    } else if (b.heading.startsWith('Withdrawing')) {
      withdrawal = {
        heading: b.heading,
        content: nodesToContentItems(b.nodes, body),
      };
    }
  }
  return {
    afterPayments: afterPaymentsIntro,
    deposit,
    withdrawal,
  };
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
  const by = sectionMap(sections);

  const ogSiteName = ogSiteNameFromTitle(metaTitle);

  const siteMeta = {
    title: metaTitle,
    description: metaDescription,
    url: 'odinfortune.com',
    ogSiteName,
    ogImagePath: '/og-img.webp',
    h1: h1Title,
  };
  writeJson('siteMeta.json', siteMeta);

  const whoWeAre = by.get('Who We Are and What Drives Us') || [];

  writeJson('dataCasinoIntro.json', {
    title: ogSiteName,
    image: {
      src: '/sectionImg/slot3.webp',
      alt: ogSiteName + ' illustration',
    },
    highlights: [],
    content: nodesToContentItems(introNodes, body),
    whoWeAre: {
      heading: 'Who We Are and What Drives Us',
      content: nodesToContentItems(whoWeAre, body),
    },
  });

  const strengths = by.get('Strengths and Limitations') || [];
  const gettingStarted = by.get('Getting Started on the Platform') || [];
  const managing = by.get('Managing Your Money') || [];

  writeJson('dataCasinoInfo.json', {
    title: 'About ' + ogSiteName,
    sections: [
      {
        heading: 'Getting Started on the Platform',
        content: nodesToContentItems(gettingStarted, body),
      },
      {
        heading: 'Managing Your Money',
        content: nodesToContentItems(managing, body),
      },
    ],
  });

  const mobile = by.get('Mobile Gaming at Odinfortune') || [];
  const langs = by.get('Languages Available') || [];
  const curs = by.get('Currencies We Support') || [];

  writeJson('dataApp.json', {
    title: ogSiteName + ' App',
    sections: [
      {
        heading: 'Mobile Gaming at Odinfortune',
        content: nodesToContentItems(mobile, body),
      },
      {
        heading: 'Languages Available',
        content: nodesToContentItems(langs, body),
      },
      {
        heading: 'Currencies We Support',
        content: nodesToContentItems(curs, body),
      },
    ],
  });

  const gameLib = by.get('Our Game Library') || [];
  const gl = buildGameLibrary(gameLib, body);
  writeJson('dataAfterSupport.json', {
    title: 'Our Game Library',
    content: nodesToContentItems(gl.introNodes, body),
    sections: gl.subsections,
  });

  const support = by.get('Customer Support') || [];
  writeJson('dataSupport.json', {
    title: 'Customer Support',
    content: nodesToContentItems(support, body),
  });

  const bonuses = by.get('Bonuses and Promotions') || [];
  writeJson('dataAfterFaq.json', buildBonuses(bonuses, body));

  const faq = by.get('Frequently Asked Questions') || [];
  writeJson('dataFaq.json', buildFaq(faq, body));

  writeJson('dataLast.json', {
    title: 'Strengths and Limitations',
    content: nodesToContentItems(strengths, body),
  });

  writeJson('dataFooter.json', {
    title: ogSiteName,
  });

  console.log('Done.');
}

main();
