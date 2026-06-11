'use client';

import React from 'react';
import layout from '../shared/sectionLayout.module.css';
import infoData from '@/src/app/data/dataInfoAfterSupport.json';
import { ContentItem } from '@/src/app/interfaces/dataInterface';
import { ContentItems } from '@/src/app/components/ui/ContentItems';

const InfoSectionAfterSupport = () => {
  const data = infoData as {
    title: string;
    intro: ContentItem[];
    fit: { heading: string; text: string; items: string[] };
    notFit: { heading: string; text: string; items: string[] };
  };

  const cards = [
    {
      heading: data.fit.heading,
      text: data.fit.text,
      items: data.fit.items,
    },
    {
      heading: data.notFit.heading,
      text: data.notFit.text,
      items: data.notFit.items,
    },
  ];

  return (
    <section id="pros" className={layout.section}>
      <div className={`${layout.wrapper} container`}>
        <h2 className={`title-black ${layout.sectionHeading}`}>{data.title}</h2>
        <div className={layout.blueWrap}>
          {data.intro.length > 0 ? (
            <div className={layout.intro}>
              <ContentItems items={data.intro} />
            </div>
          ) : null}
          <div className={`lastBlock gap-64 ${layout.grid2}`}>
            {cards.map((card) => (
              <div
                className={`lastBlockElement ${layout.card}`}
                key={card.heading}
              >
                <h3 className="title-black title-small">{card.heading}</h3>
                {card.text ? <p className="text">{card.text}</p> : null}
                <ul>
                  {card.items.map((item) => (
                    <li className="text" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSectionAfterSupport;
