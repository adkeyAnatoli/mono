import React from 'react';
import { ContentItem } from '@/src/app/interfaces/dataInterface';
import ContentBlockTable from '@/src/app/components/staticContent/ContentBlockTable';

type Props = {
  items: ContentItem[];
  inlineHeadingClassName?: string;
};

function HeadingBlock({
  level,
  className,
  text,
}: {
  level: number;
  className: string;
  text: string;
}) {
  const L = Math.min(6, Math.max(2, level));
  switch (L) {
    case 2:
      return <h2 className={className}>{text}</h2>;
    case 3:
      return <h3 className={className}>{text}</h3>;
    case 4:
      return <h4 className={className}>{text}</h4>;
    case 5:
      return <h5 className={className}>{text}</h5>;
    default:
      return <h6 className={className}>{text}</h6>;
  }
}

export function ContentItems({
  items,
  inlineHeadingClassName = 'title-black title-small',
}: Props) {
  return (
    <>
      {items.map((item, idx) => {
        if (item.type === 'paragraph') {
          return (
            <p className="text" key={idx}>
              {item.text}
            </p>
          );
        }
        if (item.type === 'heading') {
          return (
            <HeadingBlock
              key={idx}
              level={item.level ?? 3}
              className={inlineHeadingClassName}
              text={item.text}
            />
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
        if (item.type === 'table') {
          return (
            <ContentBlockTable
              key={idx}
              headers={item.headers}
              rows={item.rows}
              variant={item.variant}
              bonusesMobileBg={item.bonusesMobileBg}
            />
          );
        }
        return null;
      })}
    </>
  );
}
