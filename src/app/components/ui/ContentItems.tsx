import React from 'react';
import { ContentItem } from '@/app/interfaces/dataInterface';
import { plainContentText } from '@/app/utils/plainContentText';
import { ContentTableInteractive } from './ContentTableInteractive';

type Props = {
  items: ContentItem[];
  headingLevelBump?: boolean;
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
  const label = plainContentText(text);
  switch (L) {
    case 2:
      return <h2 className={className}>{label}</h2>;
    case 3:
      return <h3 className={className}>{label}</h3>;
    case 4:
      return <h4 className={className}>{label}</h4>;
    case 5:
      return <h5 className={className}>{label}</h5>;
    default:
      return <h6 className={className}>{label}</h6>;
  }
}

export function ContentItems({
  items,
  headingLevelBump = false,
  inlineHeadingClassName,
}: Props) {
  const headingClass = inlineHeadingClassName ?? 'title-white title-small';

  return (
    <>
      {items.map((item, idx) => {
        if (item.type === 'paragraph') {
          return (
            <p className="text" key={idx}>
              {plainContentText(item.text)}
            </p>
          );
        }
        if (item.type === 'heading') {
          const effectiveLevel = Math.min(
            6,
            item.level + (headingLevelBump ? 1 : 0)
          );
          return (
            <HeadingBlock
              key={idx}
              level={effectiveLevel}
              className={headingClass}
              text={item.text}
            />
          );
        }
        if (item.type === 'list-dotted') {
          return (
            <ul key={idx}>
              {item.items.map((listItem, liIndex) => (
                <li className="text" key={liIndex}>
                  {plainContentText(listItem)}
                </li>
              ))}
            </ul>
          );
        }
        if (item.type === 'list-number') {
          return (
            <ol key={idx}>
              {item.items.map((listItem, liIndex) => (
                <li className="text" key={liIndex}>
                  {plainContentText(listItem)}
                </li>
              ))}
            </ol>
          );
        }
        if (item.type === 'table') {
          return (
            <ContentTableInteractive
              key={idx}
              headers={item.headers.map((h) => plainContentText(h))}
              rows={item.rows.map((row) =>
                row.map((cell) => plainContentText(cell))
              )}
            />
          );
        }
        return null;
      })}
    </>
  );
}
