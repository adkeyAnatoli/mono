'use client';
import style from './bonusDetailSection.module.css';
import TableHeader from './tableComponents/TableHeader';
import TableBody from './tableComponents/TableBody';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useWebsite } from '@/src/app/context/WebsiteProvider';
import { IOffer } from '@/src/app/interfaces/mainInterfaces';

const BonusDetailSection: React.FC = () => {
  const t = useTranslations('bonusDetails_section');
  const { website } = useWebsite();

  const [offers, setOffers] = useState<IOffer[]>([]);
  useEffect(() => {
    if (website) {
      setOffers(website.offers.slice(0, 6));
    }
  }, [website]);
  if (!website) return null;
  const handleRefresh = () => {
    const shuffledOffers = [...website.offers]
      .sort(() => Math.random() - 0.5)
      .slice(0, 6);
    setOffers(shuffledOffers);
  };
  return (
    <section id="bonuses">
      <div className={`${style.wrapper} container`}>
        <h2 className="title-black">{t('bonus_details')}</h2>
        <div className={`table ${style.table}`}>
          <TableHeader />
          <TableBody offers={offers} />
        </div>
        <button
          className={`${style.button} button-primary`}
          onClick={handleRefresh}
        >
          {t('refresh')}
        </button>
      </div>
    </section>
  );
};

export default BonusDetailSection;
