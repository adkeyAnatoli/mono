'use client';
import React from 'react';
import style from './bonusSection.module.css';
// import { IBonusSection } from '@/src/app/interfaces/bonusSectionInterface';
import Button from '../../buttons/ButtonLink';
import { useWebsite } from '@/src/app/context/WebsiteProvider';

const BonusSection: React.FC = () => {
  const { website } = useWebsite();
  if (!website) {
    return (
      <section className={`${style.someSection}`}>
        <div className={style.bonusSection}>
          <div className={`container ${style.bonusSection_wrapper}`}>
            <div className={style.bonusSection_left}>
              {/* <h2 className={style.title}>Welcome Bonus</h2> */}
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
                text="CLAIM BONUS"
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
    <section className={`${style.someSection}`}>
      <div className={style.bonusSection}>
        <div className={`container ${style.bonusSection_wrapper}`}>
          <div className={style.bonusSection_left}>
            {/* <h2 className={style.title}>Welcome Bonus</h2> */}
            <p className={style.desktop}>
              Exclusive welcome offer of
              <span> {offer.bonuses.welcome_bonus}</span>
            </p>
            <p className={style.mobile}>
              Exclusive welcome bonus of
              <span> {offer.bonuses.welcome_bonus}</span>
            </p>
            <Button
              id={offer.id}
              link={offer.link}
              text="CLAIM BONUS"
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
