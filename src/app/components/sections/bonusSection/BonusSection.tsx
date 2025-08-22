import React from 'react';
import style from './bonusSection.module.css';
import { IBonusSection } from '@/src/app/interfaces/bonusSectionInterface';
import Button from '../../buttons/ButtonLink';
import { useTranslations } from 'next-intl';

const BonusSection: React.FC<IBonusSection> = ({ data }) => {
  const t = useTranslations('welcome_section');
  return (
    <section className={`${style.someSection}`}>
      <div className={`${style.bonusSection}`}>
        <div className={`container ${style.bonusSection_wrapper}`}>
          <div className={style.bonusSection_left}>
            {/* <h2 className={style.title}>{t('title')}</h2> */}
            <p className={style.desktop}>
              {t('welcome_offer')}
              <span> {data.bonuses.welcome_bonus}</span>
            </p>
            <p className={style.mobile}>
              {t('welcome_offer')}
              <span> {data.bonuses.welcome_bonus}</span>
            </p>
            <Button
              id={data.id}
              link={data.link}
              text={t('button')}
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
