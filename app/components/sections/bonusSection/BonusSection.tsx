'use client';
import React from 'react';
import style from './bonusSection.module.css';
import Button from '../../buttons/ButtonLink';
import { useWebsite } from '@/app/context/WebsiteProvider';
import siteMeta from '@/app/data/siteMeta.json';
import { plainContentText } from '@/app/utils/plainContentText';
import BlockLink from '../../blocksLink/BlockLink';

const h1Text = plainContentText(siteMeta.h1);

const BonusSection: React.FC = () => {
  const { website } = useWebsite();
  if (!website) {
    return (
      <section className={style.someSection}>
        <div className={style.bonusSection}>
          <div className={`container ${style.bonusSection_wrapper}`}>
            <div className={style.bonusSection_left}>
              <h1 className={style.h1Block}>{h1Text}</h1>
              <p className={style.desktop}>
                Exclusive welcome offer of
                <span></span>
              </p>
              <p className={style.mobile}>
                Exclusive welcome bonus of
                <span></span>
              </p>
              <Button
                id={0}
                link={''}
                text="Claim Bonus"
                classes="button-primary"
              />
            </div>
            <div className={style.bonusSection_right}></div>
          </div>
        </div>
      </section>
    );
  }
  const data = website.offers[0];
  return (
    <section className={style.someSection}>
      <div className={style.bonusSection}>
        <div className={`container ${style.bonusSection_wrapper}`}>
          <div className={style.bonusSection_left}>
            <h1 className={style.h1Block}>{h1Text}</h1>
            <BlockLink link={data.link} id={data.id} classes={''}>
              <p className={style.desktop}>
                Exclusive welcome offer of
                <span> {data.bonuses.welcome_bonus}</span>
              </p>
              <p className={style.mobile}>
                Exclusive welcome bonus of
                <span> {data.bonuses.welcome_bonus}</span>
              </p>
            </BlockLink>
            <Button
              id={data.id}
              link={data.link}
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
