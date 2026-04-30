import faqData from '@/app/data/dataFaq.json';
import FaqItem from './FaqItem';
import style from './faqSection.module.css';

const FaqSection = () => {
  return (
    <section className={style.section}>
      <div className="container">
        <h2 className="title-black">{faqData.title}</h2>
        <div className={style.faqWrapper}>
          {faqData.faqList.map((faqElement, index) => (
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
