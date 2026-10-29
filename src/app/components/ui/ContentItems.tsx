import React, { createElement } from 'react';
import { ContentItem } from '@/app/interfaces/dataInterface';
import { plainContentText } from '@/app/utils/plainContentText';
import { ContentTableInteractive } from './ContentTableInteractive';

type Props = {
  items: ContentItem[];
  inlineHeadingClassName?: string;
};

const LIST_LABEL_RE = /^\*\*(.+?)\*\*\s*(.*)$/;

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
  return createElement(`h${L}`, { className }, plainContentText(text));
}

function ListItemText({ text }: { text: string }) {
  const match = text.match(LIST_LABEL_RE);
  if (!match) {
    return <>{plainContentText(text)}</>;
  }

  const label = plainContentText(match[1]);
  const rest = plainContentText(match[2]);

  return (
    <>
      <span className="list-label">{label}</span>
      {rest ? ` ${rest}` : null}
    </>
  );
}

export function ContentItems({ items, inlineHeadingClassName }: Props) {
  const headingClass = inlineHeadingClassName ?? 'title-white title-small';

  return (
    <>
      {items.map((item, idx) => {
        switch (item.type) {
          case 'paragraph':
            return (
              <p className="text" key={idx}>
                {plainContentText(item.text)}
              </p>
            );
          case 'heading':
            return (
              <HeadingBlock
                key={idx}
                level={item.level}
                className={headingClass}
                text={item.text}
              />
            );
          case 'list-dotted':
            return (
              <ul key={idx}>
                {item.items.map((listItem, liIndex) => (
                  <li className="text" key={liIndex}>
                    <ListItemText text={listItem} />
                  </li>
                ))}
              </ul>
            );
          case 'list-number':
            return (
              <ol key={idx}>
                {item.items.map((listItem, liIndex) => (
                  <li className="text" key={liIndex}>
                    <ListItemText text={listItem} />
                  </li>
                ))}
              </ol>
            );
          case 'table':
            return (
              <ContentTableInteractive
                key={idx}
                headers={item.headers.map((h) => plainContentText(h))}
                rows={item.rows.map((row) =>
                  row.map((cell) => plainContentText(cell))
                )}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
}
