import React from 'react';
import style from './infoSectionAfterPayments.module.css';
import data from '@/app/data/dataAfterPayments.json';
import { ContentItem } from '@/app/interfaces/dataInterface';
import { ContentItems } from '@/app/components/ui/ContentItems';
import { plainContentText } from '@/app/utils/plainContentText';
// import Image from 'next/image';

const newData = data as {
  sections: {
    heading: string;
    content: ContentItem[];
  }[];
};

const InfoSectionAfterPayments = () => {
  // const WIDTH_IMG = 354;
  // const HEIGHT_IMG = 202;
  return (
    <section className="redSection">
      <div className={`${style.wrapper} container`}>
        {/* <h3 className="title-white title-small">
          Licenses: Is Villento Casino Legit in Canada
        </h3>
        <div className={`${style.block}`}>
          <p className="text">
            Villento Casino operates legally and transparently under three major
            licenses: Kahnawake Gaming Commission (Canada). These licenses
            guarantee adherence to fair gaming practices, secure transactions,
            and responsible gaming policies. The casino’s compliance record
            remains clean and public.
          </p>
          <div className={style.imgBlock}>
            <Image
              src="/sectionImg/license.webp"
              width={WIDTH_IMG}
              height={HEIGHT_IMG}
              alt="License"
            />
          </div>
        </div> */}

        <div className={`lastBlock gap-64`}>
          {newData.sections.map((section, index) => (
            <div className={'lastBlockElement'} key={index}>
              <h3 className="title-white title-small">
                {plainContentText(section.heading)}
              </h3>
              <ContentItems items={section.content} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfoSectionAfterPayments;
