import React from 'react';
import style from './h1Section.module.css';

const H1Section = ({ h1String }: { h1String: string }) => {
  return (
    <section className={`${style.section} redSection`}>
      <div className={'wrapper container'}>
        <h1 className="title-white">{h1String}</h1>
      </div>
    </section>
  );
};

export default H1Section;
