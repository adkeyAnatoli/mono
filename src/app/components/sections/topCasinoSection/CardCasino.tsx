'use client';
import React from 'react';
import Image from 'next/image';
import style from './styles/cardCasino.module.css';
import { IBonusSection } from '@/app/interfaces/bonusSectionInterface';
import ButtonLink from '../../buttons/ButtonLink';
import { useCasinoRedirect } from '@/app/hooks/useCasinoRedirect';
import { uiPhrases } from '@/app/data/uiPhrases';

const CardCasino: React.FC<IBonusSection> = ({ data }) => {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME;
  const handleRedirect = useCasinoRedirect();

  return (
    <div
      className={style.cardCasino}
      onClick={handleRedirect(data.id, data.link)}
    >
      <div className={style.cardHead}>
        <div className={style.logoWrap}>
          <Image
            src={`https://api.adkey-seo.com/storage/images/offers/${data.logo}`}
            width={190}
            height={76}
            alt={`${data.name} in ${siteName}`}
            title={`${data.name} in ${siteName}`}
            priority
          />
        </div>
        <div className={style.welcomeLabel}>{uiPhrases.welcomeBonus}</div>
      </div>
      <div className={style.cardBody}>
        <p>{data.bonuses.welcome_bonus}</p>
        <ButtonLink
          id={data.id}
          text={uiPhrases.claimBonus}
          link={data.link}
          classes={'button-secondary'}
        />
      </div>
    </div>
  );
};

export default CardCasino;
