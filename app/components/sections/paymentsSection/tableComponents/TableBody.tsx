import { ITablePaymentsProps } from '@/app/interfaces/tablePaymentsProps';
import Image from 'next/image';
import React, { FC } from 'react';
import style from './styles/tableBody.module.css';
import styleTH from './styles/tableHead.module.css';
import ButtonLink from '@/app/components/buttons/ButtonLink';

const TableBody: FC<ITablePaymentsProps> = ({ payments, offer }) => {
  return (
    <>
      {payments.map((payment) => (
        <div key={payment.payment_id} className={style.block}>
          <Image
            className={style.img}
            src={`https://api.adkey-seo.com/storage/images/payments/${payment.image}`}
            width={120}
            height={70}
            alt={`${payment.name}`}
          />
          <p className="table_block  width-140">{payment.type}</p>
          <p className="table_block  width-140">{payment.country}</p>
          <p className="table_block  width-140">{payment.commission}</p>
          <p className="table_block  width-160">{payment.processing_time}</p>
          <p className="table_block  width-160">{payment.min_dep}</p>
          <ButtonLink
            id={offer.id}
            link={offer.link}
            classes={`${style.button} ${styleTH.last} button-secondary table_block`}
            text={'Deposit'}
          />
        </div>
      ))}
    </>
  );
};

export default TableBody;
