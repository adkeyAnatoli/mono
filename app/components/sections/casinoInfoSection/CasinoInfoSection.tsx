import React from 'react';
import style from './casinoInfoSection.module.css';
import Image from 'next/image';
import data from "@/app/data/dataCasinoInfo.json"

const CasinoInfoSection = () => {
  return (
    <section className={`${style.section} redSection`}>
      <div className={`${style.wrapper} container`}>
        <h1 className="title-white">{data.title}</h1>
        <div className={style.firstBlock}>
          <div className={style.firstBlock_text}>

            <ul>
              {data['title-list'].map((text, index) => (
                <li className="text" key={index}>{text}</li>
              ))}
            </ul>
            <p className="text">
              {data['title-text']}
            </p>
          </div>
          <div className={style.firstBlock_image}>
            <Image
              src="/sectionImg/slot3.webp"
              width={665}
              height={404}
              alt="Casino Velden Velden am Wörthersee"
            />
          </div>
        </div>
        <div className={style.middleBlock}>
          <h3 className={`${style.title} title-white title-small`}>
            {data['first-section-title']}
          </h3>
          <p className="text">
            {data['first-section-text-top']}
          </p>
          <ul>
            {data['first-section-list'].map((text, index) => (
              <li className="text" key={index}>{text}</li>
            ))}
          </ul>
          <p className="text">
            {data['first-section-text-bottom']}
          </p>
        </div>
        <div className={style.middleBlock}>
          <h3 className={`${style.title} title-white title-small`}>
            {data['second-section-title']}
          </h3>
          <p className="text">
            {data['second-section-text']}
          </p>
        </div>

        <div className={style.middleBlock}>
          <h3 className={`${style.title} title-white title-small`}>
            {data['third-section-title']}
          </h3>
          <p className="text">
            {data['third-section-text']}
          </p>
        </div>

        <div className={`listBlock lastBlock gap-64`}>
          {data.list.map((elem, index) => (
            <div className="lastBlockElement" key={index}>
              <h3 className="title-white title-small">{elem.title}</h3>
              <div>
                <p className="text">
                  {elem.contentList!.topText}
                </p>
                <ul className={style.lastBlock}>
                  {elem.contentList!.list.map((text, index) => (
                    <li className="text" key={index}>{text}</li>
                  ))}
                </ul>
                <p className="text">
                  {elem.contentList!.lastText}
                </p>
              </div>
            </div>

          ))}
        </div>
      </div>
    </section>
  );
};

export default CasinoInfoSection;
