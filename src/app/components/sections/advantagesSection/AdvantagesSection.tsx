import React from 'react';
import Image from 'next/image';
import style from './advantagesSection.module.css';
import Button from '../../buttons/ButtonLink';
import ImageLink from '../../images/ImageLink';
import { IOffer } from '@/src/app/interfaces/mainInterfaces';
import { useTranslations } from 'next-intl';

const AdvantagesSection: React.FC<{ offer: IOffer }> = ({ offer }) => {
  const WIDTH_IMG = 400;
  const HEIGHT_IMG = 440;
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME;

  const t = useTranslations('lastSection');
  const tApp = useTranslations('appSection');
  const tAdvantages = useTranslations('advantages_section');

  return (
    <section className={`${style.section} redSection`}>
      <div className="container">
        <div className={`${style.wrapper}`}>
          <div className={style.leftBlock}>
            <h3 className={style.title}>{tAdvantages('advantages')}</h3>
            <ul>
              {t.raw('left').map((text: string, index: number) => (
                <li key={index}>
                  <Image
                    src="/svg/star.svg"
                    height={30}
                    width={30}
                    alt="star"
                  />
                  <p>{text}</p>
                </li>
              ))}
            </ul>
            <Button
              id={offer.id}
              text={tAdvantages('know_more')}
              classes={`${style.button} button-primary`}
              link={offer.link}
            />
          </div>
          <div className={style.rightBlock}>
            <h3 className={style.title}>{tApp('title')}</h3>
            <Image
              className={style.backImg}
              src="/sectionImg/slot2.webp"
              width={WIDTH_IMG}
              height={HEIGHT_IMG}
              alt={`${siteName} Mobile`}
              title={`${siteName} Mobile`}
            />
            <div className={style.downloadBlock}>
              <ImageLink
                link={offer.link}
                id={offer.id}
                src="/appstore.png"
                height={53}
                width={181}
                alt={`${siteName} in App Store`}
                title={`${siteName} in App Store`}
              />
              <ImageLink
                link={offer.link}
                id={offer.id}
                src="/googleplay.png"
                height={54}
                width={181}
                alt={`${siteName} in Google Play`}
                title={`${siteName} in Google Play`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
