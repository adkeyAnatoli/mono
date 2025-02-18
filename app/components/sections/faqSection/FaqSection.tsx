'use client';
import React, { useState } from 'react';
import faqData from '@/app/data/dataFaq.json';
import Image from 'next/image';
import style from './faqSection.module.css';

const FaqSection = () => {
  const [visibleItems, setVisibleItems] = useState<Record<number, boolean>>({});

  function handleClick(index: number) {
    setVisibleItems((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  }

  return (
    <section className={style.section}>
      <div className="container">
        <h2 className="title-black">CASINO FAQ</h2>
        <div className={style.faqWrapper}>
          {faqData.map((faqElement, index) => (
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
