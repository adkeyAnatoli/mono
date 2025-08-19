import React from 'react';
import style from './styles/tableHeader.module.css';
import { useTranslations } from 'next-intl';

const TableHeader = () => {
  const t = useTranslations('bonusDetails_section');
  
  return (
    <div className={`${style.table_head} row`}>
      <p>{t('casino')}</p>
      <p className="hide-1000">{t('bonuses')}</p>
      <p>{t('rate')}</p>
      <p>{t('free_spins')}</p>
      <p>{t('more_info')}</p>
      <p className="hide-850">{t('get')}</p>
    </div>
  );
};

export default TableHeader;
