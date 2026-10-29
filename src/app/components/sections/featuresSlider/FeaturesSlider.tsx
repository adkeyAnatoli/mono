'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import style from './featuresSlider.module.css';
import supportData from '@/app/data/dataSupport.json';
import casinoInfoData from '@/app/data/dataCasinoInfo.json';
import { ContentItem, ContentSection } from '@/app/interfaces/dataInterface';
import { ContentItems } from '@/app/components/ui/ContentItems';
import { plainContentText } from '@/app/utils/plainContentText';
import { useMediaQuery } from '@/app/hooks/useMediaQuery';
import 'swiper/css';
import 'swiper/css/navigation';

const NAV_PREV = '.features-swiper-prev';
const NAV_NEXT = '.features-swiper-next';

const navigationBase = {
  prevEl: NAV_PREV,
  nextEl: NAV_NEXT,
  addIcons: false,
} as const;

type FeatureSlide = {
  title: string;
  content: ContentItem[];
  sections?: ContentSection[];
};

const slides: FeatureSlide[] = [
  supportData as FeatureSlide,
  {
    title: (casinoInfoData as FeatureSlide).title,
    content: (casinoInfoData as FeatureSlide).content,
    sections: (casinoInfoData as { sections: ContentSection[] }).sections,
  },
];

function syncNav(swiper: SwiperType) {
  const nav = swiper.params.navigation;
  if (
    nav &&
    typeof nav === 'object' &&
    nav.enabled !== false &&
    swiper.navigation
  ) {
    swiper.navigation.update();
  }
}

function FeatureBlock({
  slide,
  titleClassName,
  textTone,
}: {
  slide: FeatureSlide;
  titleClassName: string;
  textTone: 'light' | 'dark';
}) {
  return (
    <div className={style.slideInner}>
      <h2 className={titleClassName}>{plainContentText(slide.title)}</h2>
      <div
        className={`${style.body} ${textTone === 'light' ? style.bodyLight : style.bodyDark}`}
      >
        {slide.content.length > 0 ? (
          <ContentItems items={slide.content} />
        ) : null}
        {slide.sections?.map((section, index) => (
          <div className={style.sectionBlock} key={index}>
            <h3 className="title-black title-small">
              {plainContentText(section.heading)}
            </h3>
            <ContentItems items={section.content} />
          </div>
        ))}
      </div>
    </div>
  );
}

const FeaturesSlider = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (isMobile) {
    return (
      <>
        <section className={`${style.mobileSection} redSection`}>
          <div className={`container ${style.mobileWrapper}`}>
            <FeatureBlock
              slide={slides[0]!}
              titleClassName="title-white"
              textTone="light"
            />
          </div>
        </section>
        <section className={`${style.mobileSection} redSection`}>
          <div className={`container ${style.mobileWrapper}`}>
            <FeatureBlock
              slide={slides[1]!}
              titleClassName="title-white"
              textTone="light"
            />
          </div>
        </section>
      </>
    );
  }

  return (
    <section className={`${style.section} redSection`}>
      <div className={`container ${style.wrapper}`}>
        <div className={style.navBtns}>
          <div className="swiper-button-prev features-swiper-prev" />
          <div className="swiper-button-next features-swiper-next" />
        </div>
        <Swiper
          className={style.swiper}
          modules={[Navigation]}
          onSwiper={syncNav}
          navigation={navigationBase}
          onSlideChange={syncNav}
          onTransitionEnd={syncNav}
          slidesPerView={1}
          allowTouchMove={false}
          loop={false}
          rewind={false}
          spaceBetween={0}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className={style.slide}>
              <FeatureBlock
                slide={slide}
                titleClassName={`title-white ${style.slideTitle}`}
                textTone="light"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default FeaturesSlider;
