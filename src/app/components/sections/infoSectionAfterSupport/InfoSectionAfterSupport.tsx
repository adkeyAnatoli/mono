import React from 'react';
import { useTranslations } from 'next-intl';
import style from './infoSectionAfterSupport.module.css';
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
  options?: {
    heading?: string;
    innerClassName?: string;
  }
) {
  const segs = segmentsFromContent(items);
  const heading = options?.heading;
  const innerClassName = options?.innerClassName ?? style.block;

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
            <div className={innerClassName}>
              {headingInFirstBlue && segIdx === firstSurf ? (
                <h3 className="title-black title-small">{heading}</h3>
              ) : null}
              {renderPlainItems(seg.items)}
            </div>
          </div>
        ) : (
          <div
            className={style.mobileWideCardTable}
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

const InfoSectionAfterSupport = () => {
  const t = useTranslations('infoSectionAfterSupport');

  const topContent = t.raw('content') as ContentItem[];
  const sectionsRaw = t.raw('sections');
  const sections = (
    Array.isArray(sectionsRaw) ? sectionsRaw : []
  ) as SectionData[];

  const contentHasTable = (items: ContentItem[]) =>
    items.some((item) => item.type === 'table');

  const hasTableInBlock =
    contentHasTable(topContent) ||
    sections.some((s) => contentHasTable(s.content));

  const data = {
    title: t('title'),
    content: topContent,
    sections,
  };

  const sectionsWrapperClass = hasTableInBlock
    ? style.sectionsStack
    : `${style.lastBlock} listBlock lastBlock gap-64`;

  return (
    <section className={style.section}>
      <div className={`${style.wrapper} container`}>
        <h2 className={`title-black ${style.sectionHeading}`}>{data.title}</h2>
        {data.content.length > 0 ? (
          <div className={style.contentFlow}>
            {renderSplitContentFlow(data.content, 'top')}
          </div>
        ) : null}
        {data.sections.length > 0 ? (
          <div className={sectionsWrapperClass}>
            {data.sections.map((elem: SectionData, index: number) => (
              <div className={style.contentFlow} key={index}>
                {renderSplitContentFlow(elem.content, `section-${index}`, {
                  heading: elem.heading,
                  innerClassName: 'lastBlockElement',
                })}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default InfoSectionAfterSupport;
