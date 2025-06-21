import React from 'react';
import style from './infoSectionAfterFaq.module.css';
import data from '@/app/data/dataAfterFaq.json';
import { ContentItem } from '@/app/interfaces/dataInterface';
const dataNew = data as {
  title: string;
  content: ContentItem[];
  sections: [
    {
      heading: string;
      content: ContentItem[];
    },
  ];
};
const InfoSectionAfterFaq = () => {
  return (
    <section className={`${style.section} redSection`}>
      <div className={'wrapper container'}>
        <h2 className="title-white">{dataNew.title}</h2>
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
        <div
          className={`${style.lastBlock} ${dataNew.sections.length > 1 ? 'listBlock' : ''} lastBlock gap-64`}
        >
          {dataNew.sections.map((elem, index) => (
            <div className="lastBlockElement" key={index}>
              <h3 className="title-white title-small">{elem.heading}</h3>
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

export default InfoSectionAfterFaq;
