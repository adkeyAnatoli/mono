interface Paragraph {
  type: 'paragraph';
  text: string;
}

export interface ContentHeading {
  type: 'heading';
  level: 2 | 3 | 4;
  text: string;
}

interface List {
  type: 'list-dotted' | 'list-number';
  items: string[];
}

export interface ContentTable {
  type: 'table';
  headers: string[];
  rows: string[][];
}

export type ContentItem = Paragraph | ContentHeading | List | ContentTable;
