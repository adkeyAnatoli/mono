import React from 'react';
import style from './appSection.module.css';
import ImageLink from '../../images/ImageLink';
import Image from 'next/image';
import { IOffer } from '@/app/interfaces/mainInterfaces';
import data from '@/app/data/dataApp.json';

const AppSection: React.FC<{ offer: IOffer }> = ({ offer }) => {
  return (
    <section id="mobile" className={`${style.section} redSection`}>
      <div className="container">
        <div className={style.firstBlock}>
          <div className={style.textBlock}>
            <h2 className="title-white title-small">{data.title}</h2>
            <Image
              className={style.hiddenImg}
              src="/sectionImg/slot4-mobile.webp"
              width={496}
              height={310}
              alt="App preview"
            />
            <p className="text">{data.text}</p>
            <div className={style.downloadBlock}>
              <ImageLink
                id={offer.id}
                link={offer.link}
                src="/googleplay.png"
                width={175}
                height={53}
                alt="Google play"
              />
              <ImageLink
                id={offer.id}
                link={offer.link}
                src="/appstore.png"
                width={175}
                height={53}
                alt="App store"
              />
            </div>
          </div>
          <div className={style.imgBlock}>
            <Image
              src="/sectionImg/slot4.webp"
              width={375}
              height={606}
              alt="App preview"
            />
          </div>
        </div>
        <div className={`${style.lastBlock} listBlock lastBlock gap-64`}>
          {data.list.map((elem, index) => (
            <div className="lastBlockElement" key={index}>
              <h3 className="title-white title-small">{elem.title}</h3>
              <p className="text">{elem.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AppSection;
