import React from 'react';
import Image from 'next/image';
import style from './styles/cardCasino.module.css';
import { IBonusSection } from '@/app/interfaces/bonusSectionInterface';
import ButtonLink from '../../buttons/ButtonLink';

const CardCasino: React.FC<IBonusSection> = ({ data }) => {
  return (
    <div className={style.cardCasino}>
      <Image
        src={`https://api.adkey-seo.com/storage/images/offers/${data.logo}`}
        width={190}
        height={76}
        alt="Logo"
        priority
      />
      <h3>{data.name}</h3>
      <h4>Welcome bonus</h4>
      <p>{data.bonuses.welcome_bonus}</p>
      <ButtonLink
        id={data.id}
        text={'Claim bonus'}
        link={data.link}
        classes={'button-secondary'}
      />
    </div>
  );
};

export default CardCasino;
