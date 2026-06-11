'use client';

import React from 'react';
import layout from '../shared/sectionLayout.module.css';
import data from '@/src/app/data/dataGames.json';
import { ContentItem } from '@/src/app/interfaces/dataInterface';
import { ContentItems } from '@/src/app/components/ui/ContentItems';

type Block = { heading: string; content: ContentItem[] };

const GamesSection = () => {
  const section = data as {
    title: string;
    intro: ContentItem[];
    sections: Block[];
  };

  return (
    <section id="gamesBlock" className={layout.section}>
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
          <div className={`lastBlock gap-64 ${layout.grid2}`}>
            {section.sections.map((block) => (
              <div className="lastBlockElement" key={block.heading}>
                <h3 className="title-black title-small">{block.heading}</h3>
                <ContentItems items={block.content} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GamesSection;
