import React from 'react';
import style from './infoSectionAfterPayments.module.css';
import { useTranslations } from 'next-intl';
import { ContentItem } from '@/src/app/interfaces/dataInterface';
// import Image from 'next/image';

interface SectionData {
  heading: string;
  content: ContentItem[];
}

const InfoSectionAfterPayments = () => {
  const t = useTranslations('infoSectionAfterPayments');

  const data = {
    sections: t.raw('sections'),
  };

  return (
    <section className={style.section}>
      <div className={`${style.wrapper} container`}>
        {/* <h3 className="title-white title-small">
          Licenses: Is Villento Casino Legit in Canada
        </h3>
        <div className={`${style.block}`}>
          <p className="text">
            Villento Casino operates legally and transparently under three major
            licenses: Kahnawake Gaming Commission (Canada). These licenses
            guarantee adherence to fair gaming practices, secure transactions,
            and responsible gaming policies. The casino's compliance record
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
          {data.sections.map((section: SectionData, index: number) => (
            <div className={'lastBlockElement'} key={index}>
              <h3 className="title-white title-small">{section.heading}</h3>
              {section.content.map((item: ContentItem, idx: number) => {
                if (item.type === 'paragraph') {
                  return (
                    <p className="text" key={idx}>
                      {item.text}
                    </p>
                  );
                } else if (item.type === 'list-number') {
                  return (
                    <ol key={idx}>
                      {item.items!.map((listItem, liIndex) => (
                        <li className="text" key={liIndex}>
                          {listItem}
                        </li>
                      ))}
                    </ol>
                  );
                } else if (item.type === 'list-dotted') {
                  return (
                    <ul key={idx}>
                      {item.items!.map((listItem, liIndex) => (
                        <li className="text" key={liIndex}>
                          {listItem}
                        </li>
                      ))}
                    </ul>
                  );
                } else {
                  return null;
                }
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfoSectionAfterPayments;
