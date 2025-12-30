import React from 'react';
import style from './h1Section.module.css';
import { useTranslations } from 'next-intl';

const H1Section = () => {
  const t = useTranslations('h1_section');
  return (
    <section className={`${style.section} redSection`}>
      <div className={'wrapper container'}>
        <h1 className="title-white">{t('h1')}</h1>
      </div>
    </section>
  );
};

export default H1Section;
