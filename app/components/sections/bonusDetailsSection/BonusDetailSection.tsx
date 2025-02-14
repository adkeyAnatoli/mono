'use client';
import { ITopCasinoSectionProps } from '@/app/interfaces/topCasinoInterface';
import style from './bonusDetailSection.module.css';
import TableHeader from './tableComponents/TableHeader';
import TableBody from './tableComponents/TableBody';
import { useState } from 'react';

const BonusDetailSection: React.FC<ITopCasinoSectionProps> = ({ data }) => {
  const [offers, setOffers] = useState(data.offers.slice(0, 6));
  const handleRefresh = () => {
    const shuffledOffers = data.offers
      .sort(() => Math.random() - 0.5)
      .slice(0, 6);
    setOffers(shuffledOffers);
  };
  return (
    <section id="bonuses">
      <div className={`${style.wrapper} container`}>
        <h2 className="title-black">Bonus Details</h2>
        <div className={`table ${style.table}`}>
          <TableHeader />
          <TableBody offers={offers} />
        </div>
        <button
          className={`${style.button} button-primary`}
          onClick={handleRefresh}
        >
          Refresh
        </button>
      </div>
    </section>
  );
};

export default BonusDetailSection;
