import React from 'react';
import style from './h1Section.module.css';
import { useTranslations } from 'next-intl';

const H1Section = () => {
  const t = useTranslations('h1_section');
  return (
    <section className={`${style.section} wrapper`}>
      <h1 className="title-white">{t('h1')}</h1>
    </section>
  );
};

export default H1Section;
