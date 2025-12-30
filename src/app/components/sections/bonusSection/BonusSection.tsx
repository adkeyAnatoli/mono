'use client';
import React from 'react';
import style from './bonusSection.module.css';
import Button from '../../buttons/ButtonLink';
import { useTranslations } from 'next-intl';
import { useWebsite } from '@/src/app/context/WebsiteProvider';
import Image from 'next/image';

const BonusSection: React.FC = () => {
  const t = useTranslations('welcome_section');
  const { website } = useWebsite();
  if (!website) {
    return (
      <div className={style.someSection}>
        <div className={style.bonusSection}>
          <div className={style.imageWrapper}>
            <Image
              src="/sectionImg/slot1.webp"
              alt="Welcome bonus slot"
              fill
              priority
              fetchPriority="high"
              className={`${style.bgImage} ${style.desktopBg}`}
            />

            <Image
              src="/sectionImg/slot1-mobile.webp"
              alt="Welcome bonus slot mobile"
              fill
              priority
              fetchPriority="high"
              className={`${style.bgImage} ${style.mobileBg}`}
            />
          </div>
          <div className={`container ${style.bonusSection_wrapper}`}>
            <div className={style.bonusSection_left}>
              {/* <h2 className={style.title}>{t('title')}</h2> */}
              <p className={style.desktop}>
                {t('welcome_offer')}
                <span></span>
              </p>
              <p className={style.mobile}>
                {t('welcome_offer')}
                <span></span>
              </p>
              <Button
                id={0}
                link={''}
                text={t('button')}
                classes="button-primary"
              />
            </div>
            <div className={style.bonusSection_right}></div>
          </div>
        </div>
      </div>
    );
  }
  const offer = website.offers[0];
  return (
    <div className={style.someSection}>
      <div className={style.bonusSection}>
        <div className={style.imageWrapper}>
          <Image
            src="/sectionImg/slot1.webp"
            alt="Welcome bonus slot"
            fill
            priority
            fetchPriority="high"
            className={`${style.bgImage} ${style.desktopBg}`}
          />

          <Image
            src="/sectionImg/slot1-mobile.webp"
            alt="Welcome bonus slot mobile"
            fill
            priority
            fetchPriority="high"
            className={`${style.bgImage} ${style.mobileBg}`}
          />
        </div>
        <div className={`container ${style.bonusSection_wrapper}`}>
          <div className={style.bonusSection_left}>
            {/* <h2 className={style.title}>{t('title')}</h2> */}
            <p className={style.desktop}>
              {t('welcome_offer')}
              <span> {offer.bonuses.welcome_bonus}</span>
            </p>
            <p className={style.mobile}>
              {t('welcome_offer')}
              <span> {offer.bonuses.welcome_bonus}</span>
            </p>
            <Button
              id={offer.id}
              link={offer.link}
              text={t('button')}
              classes="button-primary"
            />
          </div>
          <div className={style.bonusSection_right}></div>
        </div>
      </div>
    </div>
  );
};

export default BonusSection;
