import { useTranslations } from 'next-intl';
import style from './faqSection.module.css';
import FaqItem from './FaqItem';

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
        <div className={style.faqWrapper}>
          {faqData.faqList.map(
            (faqElement: { title: string; text: string }, index: number) => (
              <FaqItem
                key={index}
                title={faqElement.title}
                text={faqElement.text}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
