import { ContentItem } from '@/src/app/interfaces/dataInterface';
import ContentBlockTable from './ContentBlockTable';
import style from './staticRichPage.module.css';

export default function RenderContentItems({
  items,
}: {
  items: ContentItem[];
}) {
  return (
    <>
      {items.map((item: ContentItem, idx: number) => {
        if (item.type === 'heading') {
          const level = item.level ?? 3;
          if (level === 4) {
            return (
              <h4 className="title-black title-small" key={idx}>
                {item.text}
              </h4>
            );
          }
          return (
            <h3 className="title-black title-small" key={idx}>
              {item.text}
            </h3>
          );
        }
        if (item.type === 'paragraph') {
          return (
            <p className="text" key={idx}>
              {item.text}
            </p>
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
            <div className={style.tableMobFullWidth} key={idx}>
              <ContentBlockTable
                headers={item.headers}
                rows={item.rows}
                variant={item.variant}
                bonusesMobileBg={item.bonusesMobileBg}
              />
            </div>
          );
        }
        return null;
      })}
    </>
  );
}
