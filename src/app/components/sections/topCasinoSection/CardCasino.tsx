'use client';

import React from 'react';
import Image from 'next/image';
import style from './styles/cardCasino.module.css';
import { IBonusSection } from '@/src/app/interfaces/bonusSectionInterface';
import ButtonLink from '../../buttons/ButtonLink';
import { useTranslations } from 'next-intl';
import { useCasinoRedirect } from '@/src/app/hooks/useCasinoRedirect';

const CardCasino: React.FC<IBonusSection> = ({ data, priority = false }) => {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME;
  const t = useTranslations('topCasino_section');
  const handleRedirect = useCasinoRedirect();

  const onCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('a')) return;
    handleRedirect(data.id, data.link)(e);
  };

  return (
    <div className={style.gradientContainer}>
      <div className={style.casinoCard} onClick={onCardClick}>
        <h3 className={style.visuallyHidden}>{data.name}</h3>
        <Image
          className={style.cardImage}
          src={`https://api.adkey-seo.com/storage/images/offers/${data.logo}`}
          width={183}
          height={73}
          alt={`${data.name} in ${siteName}`}
          title={`${data.name} in ${siteName}`}
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
        />
        <span className={style.cardBonusText}>
          <span className={style.cardWelcome} aria-hidden="true">
            {t('welcome_bonus')}
          </span>
          <span className={style.cardBonus}>{data.bonuses.welcome_bonus}</span>
        </span>
        <span className={style.cardButton}>
          <ButtonLink
            id={data.id}
            text={t('claim_bonus')}
            link={data.link}
            classes={'button-secondary'}
          />
        </span>
      </div>
    </div>
  );
};

export default CardCasino;
