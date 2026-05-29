'use client';
import React from 'react';
import style from './lastSection.module.css';
import lastData from '@/src/app/data/dataLast.json';
import {
  ContentItem,
  LastSectionTable,
} from '@/src/app/interfaces/dataInterface';
import ContentBlockTable from '@/src/app/components/staticContent/ContentBlockTable';

type Segment =
  | { kind: 'copy'; items: ContentItem[] }
  | { kind: 'table'; item: ContentItem & { type: 'table' } };

function segmentsFromContent(items: ContentItem[]): Segment[] {
  const segments: Segment[] = [];
  let bucket: ContentItem[] = [];

  const flushBucket = () => {
    if (bucket.length > 0) {
      segments.push({ kind: 'copy', items: bucket });
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

function renderContentItems(items: ContentItem[]) {
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

function LastSectionContentTable(
  props: React.ComponentProps<typeof ContentBlockTable>
) {
  return (
    <div className={style.tableMobFullWidth}>
      <ContentBlockTable {...props} />
    </div>
  );
}

const LastSection = () => {
  const data = {
    title: lastData.title,
    content: lastData.content as ContentItem[],
    tables: lastData.tables as LastSectionTable[],
  };

  const segments = segmentsFromContent(data.content);

  return (
    <section className={`${style.section}`}>
      <div className="wrapper container">
        <h2 className="title-black">{data.title}</h2>
        <div className={style.flow}>
          {segments.map((seg, segIdx) => {
            if (seg.kind === 'copy') {
              return (
                <div key={`copy-${segIdx}`} className={style.textBlock}>
                  {renderContentItems(seg.items)}
                </div>
              );
            }
            return (
              <LastSectionContentTable
                key={`table-${segIdx}`}
                headers={seg.item.headers}
                rows={seg.item.rows}
                variant={seg.item.variant}
                bonusesMobileBg={seg.item.bonusesMobileBg}
              />
            );
          })}
          {data.tables.length > 0 ? (
            <div className={style.tableBlocks}>
              {data.tables.map((table, tableIdx) => (
                <div className={style.tableBlock} key={tableIdx}>
                  <h3 className="title-black">{table.heading}</h3>
                  <LastSectionContentTable
                    headers={table.headers}
                    rows={table.rows}
                    variant={table.variant}
                    bonusesMobileBg={table.bonusesMobileBg}
                  />
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default LastSection;
