import React from 'react';
import { ContentItem } from '@/app/interfaces/dataInterface';
import { ContentItems } from '@/app/components/ui/ContentItems';
import { plainContentText } from '@/app/utils/plainContentText';
import style from './lastSection.module.css';

type Props = {
  title: string;
  content: ContentItem[];
};

export function LastSectionContent({ title, content }: Props) {
  return (
    <>
      <h2 className="title-black">{plainContentText(title)}</h2>
      {content.length > 0 ? (
        <div className={style.textBlock}>
          <ContentItems
            items={content}
            inlineHeadingClassName="title-black title-small"
          />
        </div>
      ) : null}
    </>
  );
}
