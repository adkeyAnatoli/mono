import Footer from '@/src/app/components/layout/Footer';
import Header from '@/src/app/components/layout/Header';
import { ContentItem } from '@/src/app/interfaces/dataInterface';
import RenderContentItems from './RenderContentItems';
import style from './staticRichPage.module.css';
import BonusSection from '../sections/bonusSection/BonusSection';
import H1Section from '../sections/h1Section/H1Section';
import FaqAccordionList from '../sections/faqSection/FaqAccordionList';
import { plainContentText } from '@/src/app/utils/plainContentText';
import type { FaqItem, PageSection } from '@/src/app/data/pageTypes';

export type { PageSection, FaqItem };

export type HeaderPageData = {
  h1: string;
  h2: string;
  intro: ContentItem[];
  sections: PageSection[];
  faq: FaqItem[] | null;
};

export type LegalPageData = {
  h1: string;
  h2: string;
  intro: ContentItem[];
  sections: PageSection[];
};

export type FaqPageData = {
  h1: string;
  h2: string;
  intro: ContentItem[];
  faq: FaqItem[];
};

type Props =
  | { variant: 'header'; data: HeaderPageData }
  | { variant: 'footer-legal'; data: LegalPageData }
  | { variant: 'footer-faq'; data: FaqPageData };

export default function StaticRichPage({ variant, data }: Props) {
  const h1 = plainContentText(data.h1);
  const h2 = plainContentText(data.h2);

  return (
    <>
      <Header isHomePage={false} />
      <main>
        <BonusSection />
        <H1Section h1={h1} />
        {variant === 'footer-faq' ? (
          <section className={style.section}>
            <div className="wrapper container">
              <div className={style.flow}>
                <h2 className={`title-black ${style.pageHeading}`}>{h2}</h2>
                {data.intro.length > 0 ? (
                  <div className={style.textBlock}>
                    <RenderContentItems items={data.intro} />
                  </div>
                ) : null}
                <FaqAccordionList items={data.faq} />
              </div>
            </div>
          </section>
        ) : (
          <section className={style.section}>
            <div className="wrapper container">
              <div className={style.flow}>
                <h2 className={`title-black ${style.pageHeading}`}>{h2}</h2>
                {data.intro.length > 0 ? (
                  <div className={style.textBlock}>
                    <RenderContentItems items={data.intro} />
                  </div>
                ) : null}
                {'sections' in data && data.sections.length > 0 ? (
                  <div className={style.sectionBlocks}>
                    {data.sections.map((section, index) => (
                      <div className={style.sectionBlock} key={index}>
                        <h2 className="title-black title-small">
                          {section.heading}
                        </h2>
                        <div className={style.textBlock}>
                          <RenderContentItems items={section.content} />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
                {variant === 'header' &&
                data.faq &&
                data.faq.length > 0 ? (
                  <FaqAccordionList items={data.faq} />
                ) : null}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
