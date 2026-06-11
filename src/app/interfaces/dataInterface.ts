interface Paragraph {
  type: 'paragraph';
  text: string;
}

interface Heading {
  type: 'heading';
  level?: 2 | 3 | 4;
  text: string;
}

interface List {
  type: 'list-dotted' | 'list-number';
  items: string[];
}

/** Inline pipe-table from MD (e.g. payment grids in joiningSection). */
interface ContentTable {
  type: 'table';
  headers: string[];
  rows: string[][];
  variant?: 'pros' | 'cons';
  bonusesMobileBg?: boolean;
}

export type ContentItem = Paragraph | Heading | List | ContentTable;

/** One comparison table in lastSection (from MD pipe tables). */
export interface LastSectionTable {
  heading: string;
  headers: string[];
  rows: string[][];
  variant?: 'pros' | 'cons';
  bonusesMobileBg?: boolean;
}
