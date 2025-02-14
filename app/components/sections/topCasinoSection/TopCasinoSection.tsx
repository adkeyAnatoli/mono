'use client';
import React, { useState } from 'react';
import CardCasino from './CardCasino';
import style from './styles/topCasinoSection.module.css';
import { ITopCasinoSectionProps } from '@/app/interfaces/topCasinoInterface';

const TopCasinoSection: React.FC<ITopCasinoSectionProps> = ({ data }) => {
  const [visibleCount, setVisibleCount] = useState(8);

  const handleShowMore = () => {
    setVisibleCount(data.offers.length);
  };
  return (
    <section className={`${style.section} container`}>
      <h2 className={`${style.title} title-black`}>
        Top Casinos {data.website.country_name}
      </h2>
      <div className={style.cards}>
        {data.offers.slice(0, visibleCount).map((offer) => (
          <CardCasino data={offer} key={offer.id} />
        ))}
      </div>
      {visibleCount < data.offers.length && (
        <button onClick={handleShowMore} className={`${style.button} button-primary`}>
          All casino
        </button>
      )}
    </section>
  );
};

export default TopCasinoSection;
