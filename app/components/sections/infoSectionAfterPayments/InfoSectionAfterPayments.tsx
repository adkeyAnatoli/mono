import React from 'react';
import style from './infoSectionAfterPayments.module.css';
import data from '@/app/data/dataAfterPayments.json';

const InfoSectionAfterPayments = () => {
  return (
    <section className="redSection">
      <div className={`${style.wrapper} container`}>
        
        
        <div className={`listBlock lastBlock gap-64`}>
          {data.map((elem, index) => (
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

export default InfoSectionAfterPayments;
