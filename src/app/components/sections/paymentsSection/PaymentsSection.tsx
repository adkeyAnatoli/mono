import { IPaymentsSectionProps } from '@/src/app/interfaces/paymentsSectionInterface';
import React from 'react';
import style from './paymentsSection.module.css';
import TableBody from './tableComponents/TableBody';
import TableHead from './tableComponents/TableHead';
import SecondTable from './tableComponents/SecondTable';

const PaymentsSection: React.FC<IPaymentsSectionProps> = ({ data }) => {
  return (
    <section className={style.section}>
      <div className="container wrapper">
        <h2 className="title-black">Payment methods</h2>
        <div className={style.table}>
          <TableHead />
          <TableBody payments={data} />
        </div>
        <div className={style.secondTable}>
          <SecondTable payments={data} />
        </div>
      </div>
    </section>
  );
};

export default PaymentsSection;
