'use client';
import faqData from '@/src/app/data/dataFaq.json';
import style from './faqSection.module.css';
import FaqAccordionList from './FaqAccordionList';

const FaqSection = () => {
  return (
    <section className={style.section}>
      <div className="container">
        <h2 className="title-black">{faqData.title}</h2>
        <FaqAccordionList items={faqData.faqList} />
      </div>
    </section>
  );
};

export default FaqSection;
