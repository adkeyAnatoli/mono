import Footer from '@/app/components/layout/Footer';
import Header from '@/app/components/layout/Header';
import { ContentItems } from '@/app/components/ui/ContentItems';
import style from './staticRichPage.module.css';
import BonusSection from '../sections/bonusSection/BonusSection';
import FaqAccordionList from '../sections/faqSection/FaqAccordionList';
import type { PageJson } from '@/app/data/pageTypes';

const headingClass = 'title-white title-small';

type Props = {
  data: PageJson;
};

export default function StaticRichPage({ data }: Props) {
  const hasSections = data.sections.length > 0;
  const hasFaq = Boolean(data.faq && data.faq.length > 0);

  return (
    <>
      <Header isHomePage={false} />
      <main>
        <BonusSection h1={data.h1} />
        <section className={style.section}>
          <div className="wrapper container">
            <div className={style.flow}>
              <h2 className={`title-white ${style.pageHeading}`}>{data.h2}</h2>
              {data.intro.length > 0 ? (
                <div className={style.textBlock}>
                  <ContentItems
                    items={data.intro}
                    inlineHeadingClassName={headingClass}
                  />
                </div>
              ) : null}
              {hasSections ? (
                <div className={style.sectionBlocks}>
                  {data.sections.map((section, index) => (
                    <div className={style.sectionBlock} key={index}>
                      <h2 className="title-white title-small">
                        {section.heading}
                      </h2>
                      <div className={style.textBlock}>
                        <ContentItems
                          items={section.content}
                          inlineHeadingClassName={headingClass}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
              {hasFaq ? (
                <section className={style.sectionF}>
                  <div className="container">
                    <h2 className="title-white">FAQ</h2>
                    <FaqAccordionList items={data.faq!} />
                  </div>
                </section>
              ) : null}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
