import React from 'react';
import style from './infoSectionAfterFaq.module.css';
import { useTranslations } from 'next-intl';
import { ContentItem } from '@/src/app/interfaces/dataInterface';
import ContentBlockTable from '@/src/app/components/staticContent/ContentBlockTable';

interface SectionData {
  heading: string;
  content: ContentItem[];
}

const InfoSectionAfterFaq = () => {
  const t = useTranslations('infoSectionAfterFaq');

  const data = {
    title: t('title'),
    content: t.raw('content'),
    sections: t.raw('sections'),
  };

  return (
    <section className={style.section}>
      <div className={`${style.wrapper} container`}>
        <h2 className={`title-black ${style.sectionHeading}`}>{data.title}</h2>
        <div className={style.surface}>
          <div className={style.block}>
            {data.content.map((item: ContentItem, idx: number) => {
              if (item.type === 'paragraph') {
                return (
                  <p className="text" key={idx}>
                    {item.text}
                  </p>
                );
              } else if (item.type === 'list-dotted') {
                return (
                  <ul key={idx}>
                    {item.items!.map((listItem, liIndex) => (
                      <li className="text" key={liIndex}>
                        {listItem}
                      </li>
                    ))}
                  </ul>
                );
              } else if (item.type === 'list-number') {
                return (
                  <ol key={idx}>
                    {item.items!.map((listItem, liIndex) => (
                      <li className="text" key={liIndex}>
                        {listItem}
                      </li>
                    ))}
                  </ol>
                );
              } else if (item.type === 'table') {
                return (
                  <ContentBlockTable
                    key={idx}
                    headers={item.headers}
                    rows={item.rows}
                    variant={item.variant}
                    bonusesMobileBg={item.bonusesMobileBg}
                  />
                );
              } else {
                return null;
              }
            })}
          </div>
          <div
            className={`${style.lastBlock} ${data.sections.length > 1 ? 'listBlock' : ''} lastBlock gap-64`}
          >
            {data.sections.map((elem: SectionData, index: number) => (
              <div className="lastBlockElement" key={index}>
                <h3 className="title-black title-small">{elem.heading}</h3>
                {elem.content.map((item: ContentItem, idx: number) => {
                  if (item.type === 'paragraph') {
                    return (
                      <p className="text" key={idx}>
                        {item.text}
                      </p>
                    );
                  } else if (item.type === 'list-dotted') {
                    return (
                      <ul key={idx}>
                        {item.items!.map((listItem, liIndex) => (
                          <li className="text" key={liIndex}>
                            {listItem}
                          </li>
                        ))}
                      </ul>
                    );
                  } else if (item.type === 'list-number') {
                    return (
                      <ol key={idx}>
                        {item.items!.map((listItem, liIndex) => (
                          <li className="text" key={liIndex}>
                            {listItem}
                          </li>
                        ))}
                      </ol>
                    );
                  } else if (item.type === 'table') {
                    return (
                      <ContentBlockTable
                        key={idx}
                        headers={item.headers}
                        rows={item.rows}
                        variant={item.variant}
                        bonusesMobileBg={item.bonusesMobileBg}
                      />
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSectionAfterFaq;
