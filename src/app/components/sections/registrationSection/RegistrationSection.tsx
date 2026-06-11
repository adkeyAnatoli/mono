'use client';

import React from 'react';
import layout from '../shared/sectionLayout.module.css';
import data from '@/src/app/data/dataRegistration.json';
import { ContentItem } from '@/src/app/interfaces/dataInterface';
import { ContentItems } from '@/src/app/components/ui/ContentItems';

type Card = { heading: string; content: ContentItem[] };

const RegistrationSection = () => {
  const section = data as {
    title: string;
    intro: ContentItem[];
    cards: Card[];
  };

  return (
    <section className={layout.section}>
      <div className={`${layout.wrapper} container`}>
        <h2 className={`title-black ${layout.sectionHeading}`}>
          {section.title}
        </h2>
        <div className={layout.blueWrap}>
          {section.intro.length > 0 ? (
            <div className={layout.intro}>
              <ContentItems items={section.intro} />
            </div>
          ) : null}
          <div className={`lastBlock gap-64 ${layout.grid3}`}>
            {section.cards.map((card) => (
              <div
                className={`lastBlockElement ${layout.card}`}
                key={card.heading}
              >
                <h3 className="title-black title-small">{card.heading}</h3>
                <ContentItems items={card.content} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationSection;
