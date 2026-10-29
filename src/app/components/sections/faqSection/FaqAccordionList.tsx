'use client';

import type { FaqItem as FaqAccordionItem } from '@/app/data/pageTypes';
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
