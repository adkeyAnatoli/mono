import Footer from '@/app/components/layout/Footer';
import Header from '@/app/components/layout/Header';
import { ContentItem } from '@/app/interfaces/dataInterface';
import { ContentItems } from '@/app/components/ui/ContentItems';
import style from './staticRichPage.module.css';
import BonusSection from '../sections/bonusSection/BonusSection';
import FaqAccordionList from '../sections/faqSection/FaqAccordionList';
import type { FaqItem, PageSection } from '@/app/data/pageTypes';

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

const headingClass = 'title-black title-small';

export default function StaticRichPage({ variant, data }: Props) {
  return (
    <>
      <Header isHomePage={false} />
      <main>
        <BonusSection h1={data.h1} />
        {variant === 'footer-faq' ? (
          <section className={style.section}>
            <div className="wrapper container">
              <div className={style.flow}>
                <h2 className={`title-black ${style.pageHeading}`}>
                  {data.h2}
                </h2>
                {data.intro.length > 0 ? (
                  <div className={style.textBlock}>
                    <ContentItems
                      items={data.intro}
                      inlineHeadingClassName={headingClass}
                    />
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
                <h2 className={`title-black ${style.pageHeading}`}>
                  {data.h2}
                </h2>
                {data.intro.length > 0 ? (
                  <div className={style.textBlock}>
                    <ContentItems
                      items={data.intro}
                      inlineHeadingClassName={headingClass}
                    />
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
                          <ContentItems
                            items={section.content}
                            inlineHeadingClassName={headingClass}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
                {variant === 'header' && data.faq && data.faq.length > 0 ? (
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
