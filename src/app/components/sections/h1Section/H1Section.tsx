import { useTranslations } from 'next-intl';
import React from 'react';
import style from './h1Section.module.css'

const H1Section = () => {
  const t = useTranslations('h1_section');
  return (
    <section className={`${style.section} redSection`}>
      <div className={'wrapper container'}>
        <h1 className="title-white">{t('title')}</h1>
      </div>
    </section>
  );
};

export default H1Section;
