import React from 'react';
import style from './lastSection.module.css';
import data from '@/app/data/dataLast.json';
import { ContentItem } from '@/app/interfaces/dataInterface';

const dataNew = data as {
  title: string;
  content: ContentItem[];
  leftTitle: string;
  left: string[];
  rightTitle: string;
  right: string[];
};

const LastSection = () => {
  return (
    <section className={style.section}>
      <div className="wrapper container">
        <h2 className="title-black">{data.title}</h2>
        <div className={style.textBlock}>
          {dataNew.content.map((item, idx) => {
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
            <h4 className="title-black">{dataNew.leftTitle}</h4>
            <ul>
              {dataNew.left.map((text, index) => (
                <li className="text" key={index}>
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="title-black ">{dataNew.rightTitle}</h4>
            <ul>
              {dataNew.right.map((text, index) => (
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
