'use client';
import React from 'react';
import style from './h1Section.module.css';
import siteMeta from '@/src/app/data/siteMeta.json';
import { plainContentText } from '@/src/app/utils/plainContentText';

type Props = {
  h1?: string;
};

const H1Section = ({ h1 }: Props) => {
  const heading = plainContentText(h1 ?? siteMeta.h1);
  return (
    <section className={`${style.section} wrapper`}>
      <h1 className="title-white">{heading}</h1>
    </section>
  );
};

export default H1Section;
