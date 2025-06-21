import React from 'react';
import style from './commonSection.module.css';
import { ContentItem } from '@/app/interfaces/dataInterface';

export interface IData {
  title: string;
  content: ContentItem[];
  sections: {
    heading: string;
    content: ContentItem[];
  }[];
}
const CommonSection = ({ dataNew }: { dataNew: IData }) => {
  return (
    <section className={`${style.section} redSection`}>
      <div className={`wrapper container ${style.wrapper}`}>
        <h1 className="title-white">{dataNew.title}</h1>
        <div className={`${style.block}`}>
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
                  {item.items.map((listItem, liIndex) => (
                    <li className="text" key={liIndex}>
                      {listItem}
                    </li>
                  ))}
                </ul>
              );
            } else if (item.type === 'list-number') {
              return (
                <ol key={idx}>
                  {item.items.map((listItem, liIndex) => (
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
        <div className={`${style.lastBlock} lastBlock`}>
          {dataNew.sections.map((elem, index) => (
            <div className="lastBlockElement" key={index}>
              <h2 className="title-white title-small">{elem.heading}</h2>
              {elem.content.map((item, idx) => {
                if (item.type === 'paragraph') {
                  return (
                    <p className="text" key={idx}>
                      {item.text}
                    </p>
                  );
                } else if (item.type === 'list-dotted') {
                  return (
                    <ul key={idx}>
                      {item.items.map((listItem, liIndex) => (
                        <li className="text" key={liIndex}>
                          {listItem}
                        </li>
                      ))}
                    </ul>
                  );
                } else if (item.type === 'list-number') {
                  return (
                    <ol key={idx}>
                      {item.items.map((listItem, liIndex) => (
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommonSection;
