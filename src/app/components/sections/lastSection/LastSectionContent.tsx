import React from 'react';
import { ContentHeading, ContentItem } from '@/app/interfaces/dataInterface';
import { plainContentText } from '@/app/utils/plainContentText';
import style from './lastSection.module.css';

type Props = {
  title: string;
  content: ContentItem[];
};

type ListSection = {
  heading: ContentHeading;
  list: Extract<ContentItem, { type: 'list-dotted' | 'list-number' }>;
};

function parseListSections(content: ContentItem[]): ListSection[] {
  const sections: ListSection[] = [];

  for (let i = 0; i < content.length; i++) {
    const item = content[i];

    if (item.type !== 'heading') {
      continue;
    }

    const next = content[i + 1];

    if (next?.type === 'list-dotted' || next?.type === 'list-number') {
      sections.push({ heading: item, list: next });
      i++;
    }
  }

  return sections;
}

export function LastSectionContent({ title, content }: Props) {
  const intro = content.find(
    (item): item is Extract<ContentItem, { type: 'paragraph' }> =>
      item.type === 'paragraph'
  );
  const listSections = parseListSections(content);

  return (
    <>
      <h2 className="title-black">{plainContentText(title)}</h2>

      {intro ? <p className="text">{plainContentText(intro.text)}</p> : null}

      {listSections.length > 0 ? (
        <div className={style.textBlock}>
          <div className={style.listBlock}>
            {listSections.map(({ heading, list }, index) => {
              const ListTag = list.type === 'list-number' ? 'ol' : 'ul';

              return (
                <div key={index}>
                  <h3 className="title-black title-small">
                    {plainContentText(heading.text)}
                  </h3>
                  <ListTag>
                    {list.items.map((listItem, liIndex) => (
                      <li className="text" key={liIndex}>
                        {plainContentText(listItem)}
                      </li>
                    ))}
                  </ListTag>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </>
  );
}
