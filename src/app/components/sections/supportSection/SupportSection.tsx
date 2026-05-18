import React from 'react';
import style from './supportSection.module.css';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ContentItem } from '@/src/app/interfaces/dataInterface';
import ContentBlockTable from '@/src/app/components/staticContent/ContentBlockTable';

interface SectionData {
  heading: string;
  content: ContentItem[];
}

const SupportSection = () => {
  const WIDTH_IMG = 547;
  const HEIGHT_IMG = 468;
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME;

  const t = useTranslations('supportSection');

  const rawSections = t.raw('sections');
  const sections = Array.isArray(rawSections)
    ? (rawSections as SectionData[])
    : [];

  const data = {
    title: t('title'),
    content: t.raw('content') as ContentItem[],
    sections,
  };

  const renderContentItems = (items: ContentItem[]) =>
    items.map((item: ContentItem, idx: number) => {
      if (item.type === 'paragraph') {
        return (
          <p className="text" key={idx}>
            {item.text}
          </p>
        );
      }
      if (item.type === 'list-dotted') {
        return (
          <ul key={idx}>
            {item.items!.map((listItem, liIndex) => (
              <li className="text" key={liIndex}>
                {listItem}
              </li>
            ))}
          </ul>
        );
      }
      if (item.type === 'list-number') {
        return (
          <ol key={idx}>
            {item.items!.map((listItem, liIndex) => (
              <li className="text" key={liIndex}>
                {listItem}
              </li>
            ))}
          </ol>
        );
      }
      if (item.type === 'table') {
        return (
          <ContentBlockTable
            key={idx}
            headers={item.headers}
            rows={item.rows}
            variant={item.variant}
            bonusesMobileBg={item.bonusesMobileBg}
          />
        );
      }
      return null;
    });

  return (
    <section className={style.section}>
      <div className={`${style.wrapper} container`}>
        <div className={style.topRow}>
          <div className={style.withImageColumn}>
            <h2 className="title-black">{data.title}</h2>
            <div className={style.textBlock}>
              {renderContentItems(data.content)}
            </div>
          </div>
          <Image
            src="/sectionImg/slot5.webp"
            width={WIDTH_IMG}
            height={HEIGHT_IMG}
            alt={`${siteName} Support`}
            title={`${siteName} Support`}
          />
        </div>
        {data.sections.length > 0 ? (
          <div className={`${style.sectionsFullWidth} lastBlock gap-64`}>
            {data.sections.map((section: SectionData, index: number) => (
              <div className="lastBlockElement" key={index}>
                <h3 className="title-black title-small">{section.heading}</h3>
                {renderContentItems(section.content)}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default SupportSection;
