import style from './styles/footer.module.css';
import Image from 'next/image';
import { getYear } from '@/src/app/utils/getYear';
import LinkToElement from '../links/LinkToElement';
import logo from '@/public/svg/logo.svg';
import masC from '@/public/payments/masC.svg';
import vC from '@/public/payments/vC.svg';
import netC from '@/public/payments/netC.svg';
import skC from '@/public/payments/skC.svg';
import bitC from '@/public/payments/bitC.svg';
import litC from '@/public/payments/litC.svg';
import ethC from '@/public/payments/ethC.svg';

import gpC from '@/public/partners/gpC.svg';
import gwC from '@/public/partners/gwC.svg';
import gcC from '@/public/partners/gcC.svg';
import gtC from '@/public/partners/gtC.svg';
import gbC from '@/public/partners/gbC.svg';
import bbC from '@/public/partners/bbC.svg';
import itlC from '@/public/partners/itlC.svg';
import ecC from '@/public/partners/ecC.svg';
// import { useTranslations } from 'next-intl';

const Footer = () => {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME;

  // const t = useTranslations('footer');

  return (
    <footer className={style.footer}>
      <div className={`${style.wrapper} container`}>
        <div className={style.logo}>
          <LinkToElement data={{ href: 'main', title: '', key: 1 }}>
            <Image
              src={logo}
              alt={`${siteName} Logo`}
              title={`${siteName} Logo`}
              priority
            />
          </LinkToElement>
        </div>
        <div className={style.payments}>
          <div className={style.paymentsBlock}>
            <Image
              className={style.blockColor}
              src={masC}
              alt={`MasterCard in ${siteName}`}
              title={`MasterCard in ${siteName}`}
              loading="eager"
            />
          </div>
          <div className={style.paymentsBlock}>
            <Image
              className={style.blockColor}
              src={vC}
              alt={`Visa in ${siteName}`}
              title={`Visa in ${siteName}`}
              loading="eager"
            />
          </div>
          <div className={style.paymentsBlock}>
            <Image
              className={style.blockColor}
              src={netC}
              alt={`Neteller in ${siteName}`}
              title={`Neteller in ${siteName}`}
              loading="eager"
            />
          </div>
          <div className={style.paymentsBlock}>
            <Image
              className={style.blockColor}
              src={skC}
              alt={`Skrill in ${siteName}`}
              title={`Skrill in ${siteName}`}
              loading="eager"
            />
          </div>
          <div className={style.paymentsBlock}>
            <Image
              className={style.blockColor}
              src={bitC}
              alt={`Bitcoin in ${siteName}`}
              title={`Bitcoin in ${siteName}`}
              loading="eager"
            />
          </div>
          <div className={style.paymentsBlock}>
            <Image
              className={style.blockColor}
              src={litC}
              alt={`Litecoin in ${siteName}`}
              title={`Litecoin in ${siteName}`}
              loading="eager"
            />
          </div>
          <div className={style.paymentsBlock}>
            <Image
              className={style.blockColor}
              src={ethC}
              alt={`Etherium in ${siteName}`}
              title={`Etherium in ${siteName}`}
              loading="eager"
            />
          </div>
        </div>
        <div className={style.partners}>
          <div className={style.partnersBlock}>
            <Image
              className={style.blockColor}
              src={gpC}
              alt={`GPWA in ${siteName}`}
              title={`GPWA in ${siteName}`}
              loading="eager"
            />
          </div>
          <div className={style.partnersBlock}>
            <Image
              className={style.blockColor}
              src={gwC}
              alt={`Gamble Aware in ${siteName}`}
              title={`Gamble Aware in ${siteName}`}
              loading="eager"
            />
          </div>
          <div className={style.partnersBlock}>
            <Image
              className={style.blockColor}
              src={gcC}
              alt={`Game care in ${siteName}`}
              title={`Game care in ${siteName}`}
              loading="eager"
            />
          </div>
          <div className={style.partnersBlock}>
            <Image
              className={style.blockColor}
              src={gtC}
              alt={`gambling Therapy in ${siteName}`}
              title={`gambling Therapy in ${siteName}`}
              loading="eager"
            />
          </div>
          <div className={style.partnersBlock}>
            <Image
              className={style.blockColor}
              src={gbC}
              alt={`Gamban in ${siteName}`}
              title={`Gamban in ${siteName}`}
              loading="eager"
            />
          </div>
          <div className={style.partnersBlock}>
            <Image
              className={style.blockColor}
              src={bbC}
              alt={`BetBlocker in ${siteName}`}
              title={`BetBlocker in ${siteName}`}
              loading="eager"
            />
          </div>
          <div className={style.partnersBlock}>
            <Image
              className={style.blockColor}
              src={itlC}
              alt={`ITech Labs in ${siteName}`}
              title={`ITech Labs in ${siteName}`}
              loading="eager"
            />
          </div>
          <div className={style.partnersBlock}>
            <Image
              className={style.blockColor}
              src={ecC}
              alt={`Ecogra in ${siteName}`}
              title={`Ecogra in ${siteName}`}
              loading="eager"
            />
          </div>
        </div>
        <div>
          <p className={style.copyright}>
            <span className={style.copyrightLeft}>18+</span>
            <span className={style.copyrightRight}>
              Copyright © {getYear()} {siteName}
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
