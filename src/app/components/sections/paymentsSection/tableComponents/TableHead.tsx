import React from 'react';
import style from './styles/tableHead.module.css';
import { useTranslations } from 'next-intl';

const TableHead = () => {
  const t = useTranslations('payments_section');

  return (
    <div className={style.head}>
      <p className="table_block width-120 fix">{t('method')}</p>
      <p className="table_block  width-140">{t('type')}</p>
      <p className="table_block width-140">{t('country')}</p>
      <p className="table_block width-140">{t('commission')}</p>
      <p className="table_block  width-160">{t('processing_time')}</p>
      <p className="table_block  width-160">{t('minimum_deposit')}</p>
      <p className={`${style.last} table_block`}>{t('deposit')}</p>
    </div>
  );
};

export default TableHead;
