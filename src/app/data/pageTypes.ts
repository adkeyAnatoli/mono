import { ContentItem } from '@/app/interfaces/dataInterface';

export type PageSection = {
  heading: string;
  content: ContentItem[];
};

export type FaqItem = {
  title: string;
  text: string;
};

export type PageJson = {
  meta: { title: string; description: string };
  h1: string;
  h2: string;
  intro: ContentItem[];
  sections: PageSection[];
  faq: FaqItem[] | null;
};

export function asPageJson(data: unknown): PageJson {
  return data as PageJson;
}
