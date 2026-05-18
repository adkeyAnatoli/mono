'use client';
import React from 'react';
import CardCasino from './CardCasino';
import style from './styles/topCasinoSection.module.css';
import { useTranslations } from 'next-intl';
import { useWebsite } from '@/src/app/context/WebsiteProvider';

const TopCasinoSection: React.FC = () => {
  const t = useTranslations('topCasino_section');

  const { website } = useWebsite();
  if (!website) return null;

  return (
    <section className={`${style.section} container`}>
      <div className={style.block}>
        <h2 className={`${style.title} title-black`}>
          {t('top_casinos')} {website.website.country_name}
        </h2>
        <div className={style.cards}>
          {website.offers.slice(0, 6).map((offer, index) => (
            <CardCasino data={offer} key={offer.id} priority={index < 2} />
          ))}
        </div>
        {/* {visibleCount < website.offers.length && (
          <button
            onClick={handleShowMore}
            className={`${style.button} button-primary`}
          >
            {t('all_casinos')}
          </button>
        )} */}
      </div>
    </section>
  );
};

export default TopCasinoSection;
