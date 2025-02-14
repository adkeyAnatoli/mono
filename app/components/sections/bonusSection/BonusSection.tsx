import React from 'react';
import style from './bonusSection.module.css';
import { IBonusSection } from '@/app/interfaces/bonusSectionInterface';
import Button from '../../buttons/ButtonLink';

const BonusSection: React.FC<IBonusSection> = ({ data }) => {
  return (
    <section className={style.bonusSection}>
      <div className={`container ${style.bonusSection_wrapper}`}>
        <div className={style.bonusSection_left}>
          <h2 className={style.title}>Welcome Bonus</h2>
          <p className={style.desktop}>
            Exclusive welcome offer of
            <span> {data.bonuses.welcome_bonus}</span>
          </p>
          <p className={style.mobile}>
            Exclusive welcome bonus of
            <span> {data.bonuses.welcome_bonus}</span>
          </p>
          <Button
            id={data.id}
            link={data.link}
            text="CLAIM BONUS"
            classes="button-primary"
          />
        </div>
        <div className={style.bonusSection_right}></div>
      </div>
    </section>
  );
};

export default BonusSection;
