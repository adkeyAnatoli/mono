import React from 'react';
import style from './lastSection.module.css';
import data from '@/app/data/dataLast.json';
import { ContentItem } from '@/app/interfaces/dataInterface';
import { ContentItems } from '@/app/components/ui/ContentItems';
import { plainContentText } from '@/app/utils/plainContentText';

type ContentGroup = {
  heading: string;
  content: ContentItem[];
};

const dataNew = data as {
  title: string;
  content: ContentItem[];
};

function groupContentByHeading(items: ContentItem[]) {
  const intro: ContentItem[] = [];
  const groups: ContentGroup[] = [];
  let currentGroup: ContentGroup | null = null;

  items.forEach((item) => {
    if (item.type === 'heading') {
      currentGroup = {
        heading: item.text,
        content: [],
      };
      groups.push(currentGroup);
      return;
    }

    if (currentGroup) {
      currentGroup.content.push(item);
      return;
    }

    intro.push(item);
  });

  return { intro, groups };
}

const LastSection = () => {
  const { intro, groups } = groupContentByHeading(dataNew.content);

  return (
    <section className={style.section}>
      <div className="wrapper container">
        <h2 className="title-black">{plainContentText(dataNew.title)}</h2>

        {intro.length > 0 && (
          <div className={style.block}>
            <ContentItems items={intro} />
          </div>
        )}

        {groups.length > 0 && (
          <div className="lastBlockElementWrapper">
            {groups.map((group, index) => (
              <div
                className="lastBlockElement"
                key={`${group.heading}-${index}`}
              >
                <h3 className="title-black title-small">
                  {plainContentText(group.heading)}
                </h3>
                <ContentItems items={group.content} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LastSection;
