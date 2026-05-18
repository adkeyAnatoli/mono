import React from 'react';
import style from '../casinoInfoSection/casinoInfoSection.module.css';
import styleJ from './joiningSection.module.css';
import { useTranslations } from 'next-intl';
import { ContentItem } from '@/src/app/interfaces/dataInterface';
import ContentBlockTable from '@/src/app/components/staticContent/ContentBlockTable';

interface SectionData {
  heading: string;
  content: ContentItem[];
}

type Segment =
  | { kind: 'surface'; items: ContentItem[] }
  | { kind: 'table'; item: ContentItem & { type: 'table' } };

function segmentsFromContent(items: ContentItem[]): Segment[] {
  const segments: Segment[] = [];
  let bucket: ContentItem[] = [];

  const flushBucket = () => {
    if (bucket.length > 0) {
      segments.push({ kind: 'surface', items: bucket });
      bucket = [];
    }
  };

  items.forEach((item) => {
    if (item.type === 'table') {
      flushBucket();
      segments.push({ kind: 'table', item });
    } else {
      bucket.push(item);
    }
  });
  flushBucket();
  return segments;
}

function renderPlainItems(items: ContentItem[]) {
  return items.map((item: ContentItem, idx: number) => {
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
    return null;
  });
}

function renderSplitContentFlow(
  items: ContentItem[],
  keyPrefix: string,
  heading?: string
) {
  const segs = segmentsFromContent(items);
  const firstSurf = segs.findIndex((s) => s.kind === 'surface');
  const headingFirstOnWhite = Boolean(heading && segs[0]?.kind === 'table');
  const headingInFirstBlue =
    Boolean(heading) && firstSurf >= 0 && !headingFirstOnWhite;

  return (
    <>
      {headingFirstOnWhite ? (
        <h3 className="title-black title-small" key={`${keyPrefix}-h`}>
          {heading}
        </h3>
      ) : null}
      {segs.map((seg, segIdx) =>
        seg.kind === 'surface' ? (
          <div className={style.surface} key={`${keyPrefix}-s-${segIdx}`}>
            <div className={style.middleBlock}>
              {headingInFirstBlue && segIdx === firstSurf ? (
                <h3 className="title-black title-small">{heading}</h3>
              ) : null}
              {renderPlainItems(seg.items)}
            </div>
          </div>
        ) : (
          <div
            className={styleJ.mobileWideCardTable}
            key={`${keyPrefix}-t-${segIdx}`}
          >
            <ContentBlockTable
              headers={seg.item.headers}
              rows={seg.item.rows}
              variant={seg.item.variant}
              bonusesMobileBg={seg.item.bonusesMobileBg}
            />
          </div>
        )
      )}
    </>
  );
}

const JoiningSection = () => {
  const t = useTranslations('joiningSection');

  const joiningTitle = t('joiningTitle');
  const joiningIntro = t.raw('joiningIntro') as ContentItem[];
  const mainSections = t.raw('mainSections') as SectionData[];
  const movingMoneyTitle = t('movingMoneyTitle');
  const movingMoneyIntro = t.raw('movingMoneyIntro') as ContentItem[];
  const lastSections = t.raw('lastSections') as SectionData[];

  return (
    <section className={`${style.section} ${styleJ.section}`}>
      <div className={`${style.wrapper} container`}>
        <h2 className={`title-black ${style.sectionHeading}`}>
          {joiningTitle}
        </h2>
        <div className={style.contentFlow}>
          {renderSplitContentFlow(joiningIntro, 'intro')}
        </div>
        {mainSections.map((section: SectionData, index: number) => (
          <div className={style.contentFlow} key={index}>
            {renderSplitContentFlow(
              section.content,
              `main-${index}`,
              section.heading
            )}
          </div>
        ))}
        <h2 className={`title-black ${style.sectionHeading}`}>
          {movingMoneyTitle}
        </h2>
        <div className={style.contentFlow}>
          {renderSplitContentFlow(movingMoneyIntro, 'money')}
        </div>
        {lastSections.map((section: SectionData, index: number) => (
          <div className={style.contentFlow} key={`last-${index}`}>
            {renderSplitContentFlow(
              section.content,
              `last-${index}`,
              section.heading
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default JoiningSection;
