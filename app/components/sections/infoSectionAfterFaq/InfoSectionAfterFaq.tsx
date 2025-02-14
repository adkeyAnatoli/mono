import React from 'react';
import style from './infoSectionAfterFaq.module.css';
import data from '@/app/data/dataAfterFaq.json'

const InfoSectionAfterFaq = () => {
  return (
    <section className={`${style.section} redSection`}>
      <div className={`${style.wrapper} container`}>
        <h2 className="title-white">
          {data.title}
        </h2>
        <p className="text">
          {data.text}
        </p>
        <div className={`${style.lastBlock} listBlock lastBlock gap-64`}>
          {data.list.map((elem, index) => (
            <div className="lastBlockElement" key={index}>
              <h3 className="title-white title-small">{elem.title}</h3>
              <p className="text">
                {elem.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfoSectionAfterFaq;
