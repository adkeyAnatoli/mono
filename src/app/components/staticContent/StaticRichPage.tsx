import Footer from '@/src/app/components/layout/Footer';
import Header from '@/src/app/components/layout/Header';
import { getTranslations } from 'next-intl/server';
import { ContentItem } from '@/src/app/interfaces/dataInterface';
import RenderContentItems from './RenderContentItems';
import style from './staticRichPage.module.css';
import BonusSection from '../sections/bonusSection/BonusSection';
import H1Section from '../sections/h1Section/H1Section';
import TopCasinoSection from '../sections/topCasinoSection/TopCasinoSection';

interface SectionData {
  heading: string;
  content: ContentItem[];
}

type Props = {
  locale: string;
  namespace: string;
};

export default async function StaticRichPage({ locale, namespace }: Props) {
  const t = await getTranslations({ locale, namespace });

  const title = t('title');
  const content = t.raw('content') as ContentItem[];
  const sections = t.raw('sections') as SectionData[];

  return (
    <>
      <Header isHomePage={false} />
      <main>
        <BonusSection />
        <H1Section />
        <TopCasinoSection />
        <section className={style.section}>
          <div className="wrapper container">
            <h1 className="title-black">{title}</h1>
            <div className={style.flow}>
              <div className={style.textBlock}>
                <RenderContentItems items={content} />
              </div>
              {Array.isArray(sections) && sections.length > 0 ? (
                <div className={style.sectionBlocks}>
                  {sections.map((section: SectionData, index: number) => (
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
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
