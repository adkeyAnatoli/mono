'use client';
import React from 'react';
import style from './bonusSection.module.css';
import Button from '../../buttons/ButtonLink';
import BlockLink from '../../blocksLink/BlockLink';
import ui from '@/src/app/data/siteUi.json';
import { useWebsite } from '@/src/app/context/WebsiteProvider';

const BonusSection: React.FC = () => {
  const { welcome_offer, button } = ui.welcome_section;
  const { website } = useWebsite();
  if (!website) {
    return (
      <section className={style.someSection}>
        <div className={style.bonusSection}>
          <div className={`container ${style.bonusSection_wrapper}`}>
            <div className={style.bonusSection_left}>
              <p className={style.desktop}>
                {welcome_offer}
                <span></span>
              </p>
              <p className={style.mobile}>
                {welcome_offer}
                <span></span>
              </p>
              <Button
                id={0}
                link={''}
                text={button}
                classes="button-primary"
              />
            </div>
            <div className={style.bonusSection_right}></div>
          </div>
        </div>
      </section>
    );
  }
  const offer = website.offers[0];
  return (
    <section className={style.someSection}>
      <div className={style.bonusSection}>
        <div className={`container ${style.bonusSection_wrapper}`}>
          <div className={style.bonusSection_left}>
            <BlockLink link={offer.link} id={offer.id} classes="">
              <p className={style.desktop}>
                {welcome_offer}
                <span> {offer.bonuses.welcome_bonus}</span>
              </p>
              <p className={style.mobile}>
                {welcome_offer}
                <span> {offer.bonuses.welcome_bonus}</span>
              </p>
            </BlockLink>
            <Button
              id={offer.id}
              link={offer.link}
              text={button}
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
