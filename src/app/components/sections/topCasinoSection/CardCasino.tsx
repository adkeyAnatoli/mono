import React from 'react';
import Image from 'next/image';
import style from './styles/cardCasino.module.css';
import { IBonusSection } from '@/src/app/interfaces/bonusSectionInterface';
import ButtonLink from '../../buttons/ButtonLink';
import { useTranslations } from 'next-intl';

const CardCasino: React.FC<IBonusSection> = ({ data, priority = false }) => {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME;
  const t = useTranslations('topCasino_section');

  return (
    <div className={style.cardCasino}>
      <Image
        src={`https://api.adkey-seo.com/storage/images/offers/${data.logo}`}
        width={190}
        height={76}
        alt={`${data.name} in ${siteName}`}
        title={`${data.name} in ${siteName}`}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
      />
      <h3>{data.name}</h3>
      <h4>{t('welcome_bonus')}</h4>
      <p>{data.bonuses.welcome_bonus}</p>
      <ButtonLink
        id={data.id}
        text={t('claim_bonus')}
        link={data.link}
        classes={'button-secondary'}
      />
    </div>
  );
};

export default CardCasino;
