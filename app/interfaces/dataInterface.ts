interface Paragraph {
  type: 'paragraph';
  text: string;
}

interface List {
  type: 'list-dotted' | 'list-number';
  items: string[];
}

export type ContentItem = Paragraph | List;
