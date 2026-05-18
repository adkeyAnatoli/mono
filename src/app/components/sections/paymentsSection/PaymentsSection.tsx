'use client';
import { IPaymentsSectionProps } from '@/src/app/interfaces/paymentsSectionInterface';
import React from 'react';
import style from './paymentsSection.module.css';
import TableBody from './tableComponents/TableBody';
import TableHead from './tableComponents/TableHead';
import SecondTable from './tableComponents/SecondTable';
import { useTranslations } from 'next-intl';
import { useWebsite } from '@/src/app/context/WebsiteProvider';

const PaymentsSection: React.FC<IPaymentsSectionProps> = ({ data }) => {
  const t = useTranslations('payments_section');
  const { website } = useWebsite();
  if (!website) return;
  const offer = website.offers[0];
  return (
    <section className={style.section}>
      <div className="container wrapper">
        <h2 className="title-black">{t('payments_methods')}</h2>
        <div className={style.table}>
          <TableHead />
          <TableBody payments={data} offer={offer} />
        </div>
        <div className={style.secondTable}>
          <SecondTable payments={data} offer={offer} />
        </div>
      </div>
    </section>
  );
};

export default PaymentsSection;
