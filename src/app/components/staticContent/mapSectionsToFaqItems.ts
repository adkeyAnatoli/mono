import { ContentItem } from '@/app/interfaces/dataInterface';

export interface FaqAccordionItem {
  title: string;
  text: string;
}

export interface StaticPageSection {
  heading: string;
  content: ContentItem[];
}

export function mapSectionsToFaqItems(
  sections: StaticPageSection[]
): FaqAccordionItem[] {
  return sections.map((section) => ({
    title: section.heading,
    text: section.content
      .filter(
        (item): item is Extract<ContentItem, { type: 'paragraph' }> =>
          item.type === 'paragraph'
      )
      .map((item) => item.text)
      .join('\n\n'),
  }));
}
