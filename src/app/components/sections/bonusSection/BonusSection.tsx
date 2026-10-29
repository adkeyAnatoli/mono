'use client';

import React from 'react';
import style from './bonusSection.module.css';
import Button from '../../buttons/ButtonLink';
import siteMeta from '@/app/data/siteMeta.json';
import { plainContentText } from '@/app/utils/plainContentText';
import BlockLink from '../../blocksLink/BlockLink';
import { useFirstOffer } from '@/app/hooks/useFirstOffer';

type Props = {
  h1?: string;
};

const BonusSection: React.FC<Props> = ({ h1 }) => {
  const h1Text = plainContentText(h1 ?? siteMeta.h1);
  const offer = useFirstOffer();
  const bonus = offer?.bonuses.welcome_bonus ?? '';
  const offerId = offer?.id ?? 0;
  const offerLink = offer?.link ?? '';

  const bonusText = (
    <>
      <p className={style.desktop}>
        Exclusive welcome offer of
        <span>{bonus ? ` ${bonus}` : ''}</span>
      </p>
      <p className={style.mobile}>
        Exclusive welcome bonus of
        <span>{bonus ? ` ${bonus}` : ''}</span>
      </p>
    </>
  );

  return (
    <section className={style.someSection}>
      <div className={style.bonusSection}>
        <div className={`container ${style.bonusSection_wrapper}`}>
          <div className={style.bonusSection_left}>
            <h1 className={style.h1Block}>{h1Text}</h1>
            {offer ? (
              <BlockLink link={offerLink} id={offerId} classes="">
                {bonusText}
              </BlockLink>
            ) : (
              bonusText
            )}
            <Button
              id={offerId}
              link={offerLink}
              text="Claim Bonus"
              classes="button-primary"
            />
          </div>
          <div className={style.bonusSection_right}></div>
        </div>
      </div>
    </section>
  );
};

export default BonusSection;
