'use client';

import React from 'react';
import Image from 'next/image';
import style from './styles/cardCasino.module.css';
import { IBonusSection } from '@/src/app/interfaces/bonusSectionInterface';
import ButtonLink from '../../buttons/ButtonLink';
import ui from '@/src/app/data/siteUi.json';
import { useCasinoRedirect } from '@/src/app/hooks/useCasinoRedirect';

const CardCasino: React.FC<IBonusSection> = ({ data, priority = false }) => {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME;
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
            {ui.topCasino_section.welcome_bonus}
          </span>
          <span className={style.cardBonus}>{data.bonuses.welcome_bonus}</span>
        </span>
        <ButtonLink
          id={data.id}
          link={data.link}
          text={ui.topCasino_section.claim_bonus}
          classes={`${style.cardButton} button-secondary`}
        />
      </div>
    </div>
  );
};

export default CardCasino;
