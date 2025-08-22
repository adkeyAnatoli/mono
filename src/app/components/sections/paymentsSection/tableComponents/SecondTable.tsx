import { ITablePaymentsProps } from '@/src/app/interfaces/tablePaymentsProps';
import Image from 'next/image';
import React, { FC } from 'react';
import style from './styles/secondTable.module.css';
import ButtonLink from '@/src/app/components/buttons/ButtonLink';
import { useTranslations } from 'next-intl';

const SecondTable: FC<ITablePaymentsProps> = ({ payments, offer }) => {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME;
  const t = useTranslations('payments_section');

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
              alt={`${payment.name} in ${siteName}`}
              title={`${payment.name} in ${siteName}`}
            />
            <ButtonLink
              id={offer.id}
              link={offer.link}
              classes={`${style.button} button-secondary table_block`}
              text={t('deposit')}
            />
          </div>
          <div className={style.body}>
            <div className={style.bodyBlock}>
              <p className={style.bodyBlockTitle}>{t('type')}</p>
              <p>{payment.type}</p>
            </div>
            <div className={style.bodyBlock}>
              <p className={style.bodyBlockTitle}>{t('country')}</p>
              <p>{payment.country}</p>
            </div>
            <div className={style.bodyBlock}>
              <p className={style.bodyBlockTitle}>{t('commission')}</p>
              <p>{payment.commission}</p>
            </div>
            <div className={style.bodyBlock}>
              <p className={style.bodyBlockTitle}>{t('processing_time')}</p>
              <p>{payment.processing_time}</p>
            </div>
            <div className={style.bodyBlock}>
              <p className={style.bodyBlockTitle}>{t('minimum_deposit')}</p>
              <p>{payment.min_dep}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default SecondTable;
