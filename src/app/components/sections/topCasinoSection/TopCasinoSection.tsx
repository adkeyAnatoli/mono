'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import CardCasino from './CardCasino';
import { useWebsite } from '@/app/context/WebsiteProvider';
import 'swiper/css';
import 'swiper/css/navigation';
import style from './styles/topCasinoSection.module.css';

const NAV_PREV = '.topcasino-swiper-prev';
const NAV_NEXT = '.topcasino-swiper-next';

const navigationBase = {
  prevEl: NAV_PREV,
  nextEl: NAV_NEXT,
  addIcons: false,
} as const;

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

// swiper.update() re-emits slideChange, so call it only on breakpoint change.
function reinitNav(swiper: SwiperType) {
  syncNav(swiper);
  swiper.update();
}

const TopCasinoSection: React.FC = () => {
  const { website } = useWebsite();
  const offers = website?.offers ?? [];

  if (!website || offers.length === 0) return null;

  const canLoop = offers.length >= 3;

  return (
    <section className={`${style.section} container`}>
      <div className={style.carouselHead}>
        <h2 className={`${style.title} title-white`}>
          Top Casinos {website.website.country_name}
        </h2>
        <div className={style.navBtns}>
          <div className="swiper-button-prev topcasino-swiper-prev" />
          <div className="swiper-button-next topcasino-swiper-next" />
        </div>
      </div>
      <Swiper
        className={style.swiper}
        modules={[Navigation]}
        onSwiper={syncNav}
        navigation={{ ...navigationBase, enabled: false }}
        onSlideChange={syncNav}
        onTransitionEnd={syncNav}
        onBreakpoint={reinitNav}
        watchOverflow={false}
        centerInsufficientSlides
        loop={canLoop}
        rewind={false}
        spaceBetween={16}
        slidesPerView="auto"
        breakpoints={{
          0: {
            slidesPerView: 'auto',
            spaceBetween: 12,
            centeredSlides: true,
            navigation: { ...navigationBase, enabled: false },
            loop: canLoop,
          },
          769: {
            slidesPerView: 2,
            spaceBetween: 24,
            centeredSlides: false,
            navigation: { ...navigationBase, enabled: true },
            loop: false,
          },
          1180: {
            slidesPerView: 3,
            spaceBetween: 24,
            centeredSlides: false,
            navigation: { ...navigationBase, enabled: true },
            loop: false,
          },
        }}
      >
        {offers.map((offer) => (
          <SwiperSlide key={offer.id} className={style.slide}>
            <CardCasino data={offer} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default TopCasinoSection;
