import { ITablePaymentsProps } from '@/app/interfaces/tablePaymentsProps';
import Image from 'next/image';
import React, { FC } from 'react';
import style from './styles/secondTable.module.css';
import ButtonLink from '@/app/components/buttons/ButtonLink';

const SecondTable: FC<ITablePaymentsProps> = ({ payments, offer }) => {
  return (
    <>
      {payments.map((payment) => (
        <div key={payment.payment_id} className={style.block}>
          <div className={style.head}>
            <Image
              className={style.img}
              src={`https://api.adkey-seo.com/storage/images/payments/${payment.image}`}
              width={140}
              height={64}
              alt={`${payment.name}`}
            />
            <ButtonLink
              id={offer.id}
              link={offer.link}
              classes={`${style.button} button-secondary table_block`}
              text={'Deposit'}
            />
          </div>
          <div className={style.body}>
            <div className={style.bodyBlock}>
              <p className={style.bodyBlockTitle}>Type</p>
              <p>{payment.type}</p>
            </div>
            <div className={style.bodyBlock}>
              <p className={style.bodyBlockTitle}>Country</p>
              <p>{payment.country}</p>
            </div>
            <div className={style.bodyBlock}>
              <p className={style.bodyBlockTitle}>Commission</p>
              <p>{payment.commission}</p>
            </div>
            <div className={style.bodyBlock}>
              <p className={style.bodyBlockTitle}>Processing time</p>
              <p>{payment.processing_time}</p>
            </div>
            <div className={style.bodyBlock}>
              <p className={style.bodyBlockTitle}>Minimum deposit</p>
              <p>{payment.min_dep}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default SecondTable;
