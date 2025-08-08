'use client';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import style from './faqSection.module.css';

interface FaqItem {
  title: string;
  text: string;
}

const FaqSection = () => {
  const [visibleItems, setVisibleItems] = useState<Record<number, boolean>>({});

  const t = useTranslations('faqSection');
  
  const faqData = {
    title: t('title'),
    faqList: t.raw('faqList')
  };

  function handleClick(index: number) {
    setVisibleItems((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  }

  return (
    <section className={style.section}>
      <div className="container">
        <h2 className="title-black">{faqData.title}</h2>
        <div className={style.faqWrapper}>
          {faqData.faqList.map((faqElement: FaqItem, index: number) => (
            <div key={index} className={style.faqBlock}>
              <div onClick={() => handleClick(index)}>
                <div className={style.faqElement}>
                  {visibleItems[index] ? (
                    <Image
                      width={24}
                      height={24}
                      src="/svg/minus.svg"
                      alt="Minus icon"
                    />
                  ) : (
                    <Image
                      width={24}
                      height={24}
                      src="/svg/plus.svg"
                      alt="Plus icon"
                    />
                  )}
                  {faqElement.title}
                </div>
              </div>
              {visibleItems[index] && (
                <div className={style.faqText}>{faqElement.text}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
