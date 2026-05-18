import { useTranslations } from 'next-intl';
import style from './faqSection.module.css';
import FaqAccordionList from './FaqAccordionList';

const FaqSection = () => {
  const t = useTranslations('faqSection');

  const faqData = {
    title: t('title'),
    faqList: t.raw('faqList'),
  };

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
