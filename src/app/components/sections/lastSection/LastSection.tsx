'use client';

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import style from './lastSection.module.css';
import data from '@/app/data/dataLast.json';
import { ContentItem } from '@/app/interfaces/dataInterface';
import { plainContentText } from '@/app/utils/plainContentText';
import 'swiper/css';
import 'swiper/css/navigation';

const TIMELINE_IMAGES = [
  '/sectionImg/pic1.webp',
  '/sectionImg/pic2.webp',
  '/sectionImg/pic3.webp',
  '/sectionImg/pic4.webp',
  '/sectionImg/pic5.webp',
  '/sectionImg/pic6.webp',
  '/sectionImg/pic7.webp',
  '/sectionImg/pic8.webp',
  '/sectionImg/pic9.webp',
] as const;

const NAV_PREV = '.timeline-swiper-prev';
const NAV_NEXT = '.timeline-swiper-next';

const navigationBase = {
  prevEl: NAV_PREV,
  nextEl: NAV_NEXT,
  addIcons: false,
} as const;

const YEAR_RE = /^\*\*(.+?):\*\*\s*(.*)$/;

type TimelineCard = {
  year: string;
  text: string;
  image?: string;
};

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

function reinitNav(swiper: SwiperType) {
  syncNav(swiper);
  swiper.update();
}

function parseTimelineItems(content: ContentItem[]): {
  intro: string;
  cards: TimelineCard[];
} {
  let intro = '';
  const cards: TimelineCard[] = [];

  for (const item of content) {
    if (item.type === 'paragraph' && !intro) {
      intro = item.text;
      continue;
    }
    if (item.type === 'list-dotted') {
      item.items.forEach((raw, index) => {
        const match = raw.match(YEAR_RE);
        const year = match ? match[1] : '';
        const text = match ? match[2] : raw;
        cards.push({
          year,
          text,
          image: TIMELINE_IMAGES[index],
        });
      });
    }
  }

  return { intro, cards };
}

const dataNew = data as {
  title: string;
  content: ContentItem[];
};

const LastSection = () => {
  const { intro, cards } = parseTimelineItems(dataNew.content);

  return (
    <section className={`${style.section} redSectionSecond`}>
      <div className={`container ${style.wrapper}`}>
        <div className={style.head}>
          <div className={style.headText}>
            <h2 className="title-black">{plainContentText(dataNew.title)}</h2>
            {intro ? (
              <p className={`text ${style.intro}`}>
                {plainContentText(intro)}
              </p>
            ) : null}
          </div>
          <div className={style.navRow}>
            <div className={style.navBtns}>
              <div className="swiper-button-prev timeline-swiper-prev" />
              <div className="swiper-button-next timeline-swiper-next" />
            </div>
          </div>
        </div>

        {cards.length > 0 ? (
          <Swiper
            className={style.swiper}
            modules={[Navigation]}
            onSwiper={syncNav}
            navigation={{ ...navigationBase, enabled: false }}
            onSlideChange={syncNav}
            onTransitionEnd={syncNav}
            onBreakpoint={reinitNav}
            watchOverflow
            loop={false}
            rewind={false}
            spaceBetween={24}
            slidesPerView="auto"
            breakpoints={{
              0: {
                slidesPerView: 'auto',
                spaceBetween: 12,
                slidesPerGroup: 1,
                navigation: { ...navigationBase, enabled: false },
              },
              769: {
                slidesPerView: 2,
                spaceBetween: 24,
                slidesPerGroup: 2,
                navigation: { ...navigationBase, enabled: true },
              },
              1180: {
                slidesPerView: 3,
                spaceBetween: 24,
                slidesPerGroup: 3,
                navigation: { ...navigationBase, enabled: true },
              },
            }}
          >
            {cards.map((card, index) => (
              <SwiperSlide key={index} className={style.slide}>
                <article className={style.card}>
                  {card.image ? (
                    <div className={style.imageWrap}>
                      <Image
                        src={card.image}
                        width={357}
                        height={341}
                        alt={
                          card.year
                            ? `${card.year} — Crown Casino history`
                            : 'Crown Casino history'
                        }
                        className={style.image}
                      />
                    </div>
                  ) : null}
                  <div className={style.cardBody}>
                    {card.year ? (
                      <h3 className={style.year}>
                        {plainContentText(card.year)}
                      </h3>
                    ) : null}
                    <p className={`text ${style.cardText}`}>
                      {plainContentText(card.text)}
                    </p>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : null}
      </div>
    </section>
  );
};

export default LastSection;
