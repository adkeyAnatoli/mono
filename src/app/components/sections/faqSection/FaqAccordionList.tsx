'use client';

import { FaqAccordionItem } from '@/src/app/components/staticContent/mapSectionsToFaqItems';
import style from './faqSection.module.css';
import FaqItem from './FaqItem';

interface FaqAccordionListProps {
  items: FaqAccordionItem[];
}

const FaqAccordionList = ({ items }: FaqAccordionListProps) => (
  <div className={style.faqWrapper}>
    {items.map((faqElement, index) => (
      <FaqItem key={index} title={faqElement.title} text={faqElement.text} />
    ))}
  </div>
);

export default FaqAccordionList;
