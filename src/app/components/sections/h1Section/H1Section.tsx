'use client';

import React from 'react';
import style from './h1Section.module.css';

type Props = {
  h1: string;
};

const H1Section = ({ h1 }: Props) => {
  return (
    <section className={`${style.section} wrapper`}>
      <h1 className="title-white">{h1}</h1>
    </section>
  );
};

export default H1Section;
