import React from 'react';
import data from '@/app/data/dataAfterSupport.json';
import style from './infoSectionAfterSupport.module.css'

const InfoSectionAfterSupport = () => {
  return (
    <section className={`${style.section} redSection`}>
      <div className={'wrapper container'}>
        <h2 className="title-white">
          {data.title}
        </h2>
        <p className="text">
          {data.content}
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

export default InfoSectionAfterSupport;
