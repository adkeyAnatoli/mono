import React from 'react';
import style from './lastSection.module.css';
import { useTranslations } from 'next-intl';
import { ContentItem } from '@/src/app/interfaces/dataInterface';

const LastSection = () => {
  const t = useTranslations('lastSection');

  const data = {
    title: t('title'),
    content: t.raw('content'),
    leftTitle: t('leftTitle'),
    left: t.raw('left'),
    rightTitle: t('rightTitle'),
    right: t.raw('right'),
  };

  return (
    <section className={style.section}>
      <div className="wrapper container">
        <h2 className="title-black">{data.title}</h2>
        <div className={style.textBlock}>
          {data.content.map((item: ContentItem, idx: number) => {
            if (item.type === 'paragraph') {
              return (
                <p className="text" key={idx}>
                  {item.text}
                </p>
              );
            } else if (item.type === 'list-dotted') {
              return (
                <ul key={idx}>
                  {item.items!.map((listItem, liIndex) => (
                    <li className="text" key={liIndex}>
                      {listItem}
                    </li>
                  ))}
                </ul>
              );
            } else if (item.type === 'list-number') {
              return (
                <ol key={idx}>
                  {item.items!.map((listItem, liIndex) => (
                    <li className="text" key={liIndex}>
                      {listItem}
                    </li>
                  ))}
                </ol>
              );
            } else {
              return null;
            }
          })}
        </div>
        <div className={style.listBlock}>
          <div>
            <h4 className="title-black">{data.leftTitle}</h4>
            <ul>
              {data.left.map((text: string, index: number) => (
                <li className="text" key={index}>
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="title-black ">{data.rightTitle}</h4>
            <ul>
              {data.right.map((text: string, index: number) => (
                <li className="text" key={index}>
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LastSection;
