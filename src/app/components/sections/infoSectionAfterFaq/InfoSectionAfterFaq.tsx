'use client';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import style from './infoSectionAfterFaq.module.css';
import data from '@/app/data/dataAfterFaq.json';
import { ContentItem } from '@/app/interfaces/dataInterface';
import { ContentTabs } from '@/app/components/ui/ContentTabs';
import { ContentItems } from '@/app/components/ui/ContentItems';
import { plainContentText } from '@/app/utils/plainContentText';
import 'swiper/css';
import 'swiper/css/navigation';

const MOBILE_MQ = '(max-width: 768px)';
const NAV_PREV = '.bonuses-swiper-prev';
const NAV_NEXT = '.bonuses-swiper-next';

const dataNew = data as {
  title: string;
  content: ContentItem[];
  sections: {
    heading: string;
    content: ContentItem[];
  }[];
};

function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ);
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  return isMobile;
}

function syncNav(swiper: SwiperType) {
  if (swiper.navigation) {
    swiper.navigation.update();
  }
}

const InfoSectionAfterFaq = () => {
  const isMobile = useIsMobile();
  const title = plainContentText(dataNew.title);

  const tabItems = dataNew.sections.map((section, index) => ({
    value: `tab-${index}`,
    label: section.heading,
    content: <ContentItems items={section.content} />,
  }));

  return (
    <section className={`${style.section} redSection`}>
      <div className={'wrapper container'}>
        <h2 className="title-white">{title}</h2>
        {dataNew.content.length > 0 && (
          <div className={style.block}>
            <ContentItems items={dataNew.content} />
          </div>
        )}
        {tabItems.length > 0 && isMobile && (
          <ContentTabs defaultValue="tab-0" items={tabItems} />
        )}
        {tabItems.length > 0 && !isMobile && (
          <>
            <div className={style.carouselHead}>
              <div className={style.navBtns}>
                <div className="swiper-button-prev bonuses-swiper-prev" />
                <div className="swiper-button-next bonuses-swiper-next" />
              </div>
            </div>
            <Swiper
              className={style.swiper}
              modules={[Navigation]}
              onSwiper={syncNav}
              navigation={{
                prevEl: NAV_PREV,
                nextEl: NAV_NEXT,
                addIcons: false,
              }}
              onSlideChange={syncNav}
              watchOverflow
              loop={false}
              spaceBetween={24}
              slidesPerView={2}
            >
              {dataNew.sections.map((section, index) => (
                <SwiperSlide key={index} className={style.slide}>
                  <div className={style.slideCard}>
                    <h3 className={style.slideTitle}>
                      {plainContentText(section.heading)}
                    </h3>
                    <ContentItems items={section.content} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        )}
      </div>
    </section>
  );
};

export default InfoSectionAfterFaq;
