import faqData from '@/app/data/dataFaq.json';
import FaqItem from './FaqItem';
import style from './faqSection.module.css';

type FaqEntry = { title: string; text: string };

const FaqSection = () => {
  const faqList = faqData.faqList as FaqEntry[];
  return (
    <section className={style.section}>
      <div className="container">
        <h2 className="title-black">{faqData.title}</h2>
        <div className={style.faqWrapper}>
          {faqList.map((faqElement, index) => (
            <FaqItem
              key={index}
              title={faqElement.title}
              text={faqElement.text}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
