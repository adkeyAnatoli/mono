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

const TopCasinoSection: React.FC = () => {
  const { website } = useWebsite();
  const offers = website?.offers ?? [];
  const NAV_PREV = '.topcasino-swiper-prev';
  const NAV_NEXT = '.topcasino-swiper-next';

  function navEnabled(swiper: SwiperType) {
    return (
      !!swiper.params.navigation &&
      typeof swiper.params.navigation === 'object' &&
      swiper.params.navigation.enabled !== false
    );
  }

  function reinitNav(swiper: SwiperType) {
    if (navEnabled(swiper) && swiper.navigation) {
      swiper.navigation.update();
    }
    swiper.update();
  }

  function syncNav(swiper: SwiperType) {
    if (!navEnabled(swiper) || !swiper.navigation) return;
    swiper.navigation?.update();
  }

  if (!website) return null;
  if (offers.length === 0) return null;

  const canLoop = offers.length >= 3;

  return (
    <section className={`${style.section} container`}>
      <div className={style.carouselHead}>
        <h2 className={`${style.title} title-black`}>
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
        navigation={{
          enabled: false,
          prevEl: NAV_PREV,
          nextEl: NAV_NEXT,
          addIcons: false,
        }}
        onSlideChange={syncNav}
        onTransitionEnd={syncNav}
        onBreakpoint={reinitNav}
        watchOverflow={false}
        centerInsufficientSlides
        loop={canLoop}
        rewind={false}
        spaceBetween={16}
        slidesPerView={'auto'}
        breakpoints={{
          0: {
            slidesPerView: 'auto',
            spaceBetween: 16,
            centeredSlides: true,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            navigation: {
              enabled: false,
              prevEl: NAV_PREV,
              nextEl: NAV_NEXT,
              addIcons: false,
            },
            loop: canLoop,
            rewind: false,
          },
          769: {
            slidesPerView: 2,
            spaceBetween: 24,
            centeredSlides: false,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            navigation: {
              enabled: true,
              prevEl: NAV_PREV,
              nextEl: NAV_NEXT,
              addIcons: false,
            },
            loop: false,
            rewind: false,
          },
          1180: {
            slidesPerView: 3,
            spaceBetween: 24,
            centeredSlides: false,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            navigation: {
              enabled: true,
              prevEl: NAV_PREV,
              nextEl: NAV_NEXT,
              addIcons: false,
            },
            loop: false,
            rewind: false,
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
