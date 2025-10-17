import React from 'react';
import Image from 'next/image';
import style from './advantagesSection.module.css';
import ImageLink from '../../images/ImageLink';
// import { IOffer } from '@/src/app/interfaces/mainInterfaces';
import data from '@/src/app/data/dataLast.json';
import dataMain from '@/src/app/data/dataApp.json';
import ButtonLinkFirstOffer from '../../buttons/ButtonLinkFirstOffer';

const AdvantagesSection: React.FC = () => {
  const WIDTH_IMG = 316;
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
            <ButtonLinkFirstOffer
              text="Know more"
              classes={`${style.button} button-primary`}
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
                src="/appstore.png"
                height={53}
                width={181}
                alt={`${siteName} in App Store`}
                title={`${siteName} in App Store`}
              />
              <ImageLink
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
