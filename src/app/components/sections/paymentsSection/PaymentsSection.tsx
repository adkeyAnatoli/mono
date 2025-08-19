import { IPaymentsSectionProps } from '@/src/app/interfaces/paymentsSectionInterface';
import React from 'react';
import style from './paymentsSection.module.css';
import TableBody from './tableComponents/TableBody';
import TableHead from './tableComponents/TableHead';
import SecondTable from './tableComponents/SecondTable';
import { useTranslations } from 'next-intl';

const PaymentsSection: React.FC<IPaymentsSectionProps> = ({ data, offer }) => {
  const t = useTranslations('payments_section');
  
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
