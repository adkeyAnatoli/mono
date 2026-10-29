import faqData from '@/app/data/dataFaq.json';
import FaqAccordionList from './FaqAccordionList';
import style from './faqSection.module.css';
import type { FaqItem } from '@/app/data/pageTypes';

const FaqSection = () => {
  const faqList = faqData.faqList as FaqItem[];
  return (
    <section className={style.section}>
      <div className="container">
        <h2 className="title-white">{faqData.title}</h2>
        <FaqAccordionList items={faqList} />
      </div>
    </section>
  );
};

export default FaqSection;
