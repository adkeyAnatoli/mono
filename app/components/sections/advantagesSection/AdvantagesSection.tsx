import React from 'react';
import Image from 'next/image';
import style from './advantagesSection.module.css';
import Button from '../../buttons/ButtonLink';
import ImageLink from '../../images/ImageLink';
import { IOffer } from '@/app/interfaces/mainInterfaces';
import data from '@/app/data/dataLast.json';
import dataMain from '@/app/data/dataApp.json';

const AdvantagesSection: React.FC<{ offer: IOffer }> = ({ offer }) => {
  const WIDTH_IMG = 396;
  const HEIGHT_IMG = 440;
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME;

  return (
    <section className={`${style.section} redSection`}>
      <div className="container">
        <div className={`${style.wrapper}`}>
          <div className={style.leftBlock}>
            <h3 className={style.title}>Advantages</h3>
            <ul>
              {data.left.map((text, index) => (
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
              text="Know more"
              classes={`${style.button} button-primary`}
              link={offer.link}
            />
          </div>
          <div className={style.rightBlock}>
            <h3 className={style.title}>{dataMain.title}</h3>
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
