import style from './styles/footer.module.css';
import Image from 'next/image';
import { getYear } from '@/app/utils/getYear';
import LinkToElement from '../links/LinkToElement';
import logo from '@/public/svg/logo.svg';
import mas from '@/public/payments/mas.svg';
import masC from '@/public/payments/masC.svg';
import v from '@/public/payments/v.svg';
import vC from '@/public/payments/vC.svg';
import net from '@/public/payments/net.svg';
import netC from '@/public/payments/netC.svg';
import sk from '@/public/payments/sk.svg';
import skC from '@/public/payments/skC.svg';
import bit from '@/public/payments/bit.svg';
import bitC from '@/public/payments/bitC.svg';
import lit from '@/public/payments/lit.svg';
import litC from '@/public/payments/litC.svg';
import eth from '@/public/payments/eth.svg';
import ethC from '@/public/payments/ethC.svg';

import gp from '@/public/partners/gp.svg';
import gpC from '@/public/partners/gpC.svg';
import gw from '@/public/partners/gw.svg';
import gwC from '@/public/partners/gwC.svg';
import gc from '@/public/partners/gc.svg';
import gcC from '@/public/partners/gcC.svg';
import gt from '@/public/partners/gt.svg';
import gtC from '@/public/partners/gtC.svg';
import gb from '@/public/partners/gb.svg';
import gbC from '@/public/partners/gbC.svg';
import bb from '@/public/partners/bb.svg';
import bbC from '@/public/partners/bbC.svg';
import itl from '@/public/partners/itl.svg';
import itlC from '@/public/partners/itlC.svg';
import ec from '@/public/partners/ec.svg';
import ecC from '@/public/partners/ecC.svg';
import data from '@/app/data/dataFooter.json';

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={`${style.wrapper} container`}>
        <div className={style.logo}>
          <LinkToElement data={{ href: 'main', title: '', key: 1 }}>
            <Image src={logo} alt="Logo" priority />
          </LinkToElement>
        </div>
        <div className={style.payments}>
          <div className={style.paymentsBlock}>
            <Image className={style.blockGray} src={mas} alt="MasterCard" />

            <Image
              className={style.blockColor}
              src={masC}
              alt="MasterCard"
              loading="eager"
            />
          </div>
          <div className={style.paymentsBlock}>
            <Image className={style.blockGray} src={v} alt="Visa" />
            <Image
              className={style.blockColor}
              src={vC}
              alt="Visa"
              loading="eager"
            />
          </div>
          <div className={style.paymentsBlock}>
            <Image className={style.blockGray} src={net} alt="Neteller" />
            <Image
              className={style.blockColor}
              src={netC}
              alt="Neteller"
              loading="eager"
            />
          </div>
          <div className={style.paymentsBlock}>
            <Image className={style.blockGray} src={sk} alt="Skrill" />
            <Image
              className={style.blockColor}
              src={skC}
              alt="Skrill"
              loading="eager"
            />
          </div>
          <div className={style.paymentsBlock}>
            <Image className={style.blockGray} src={bit} alt="Bitcoin" />
            <Image
              className={style.blockColor}
              src={bitC}
              alt="Bitcoin"
              loading="eager"
            />
          </div>
          <div className={style.paymentsBlock}>
            <Image className={style.blockGray} src={lit} alt="Litecoin" />
            <Image
              className={style.blockColor}
              src={litC}
              alt="Litecoin"
              loading="eager"
            />
          </div>
          <div className={style.paymentsBlock}>
            <Image className={style.blockGray} src={eth} alt="Etherium" />
            <Image
              className={style.blockColor}
              src={ethC}
              alt="Etherium"
              loading="eager"
            />
          </div>
        </div>
        <div className={style.partners}>
          <div className={style.partnersBlock}>
            <Image className={style.blockGray} src={gp} alt="GPWA" />
            <Image
              className={style.blockColor}
              src={gpC}
              alt="GPWA"
              loading="eager"
            />
          </div>
          <div className={style.partnersBlock}>
            <Image className={style.blockGray} src={gw} alt="Gamble Aware" />
            <Image
              className={style.blockColor}
              src={gwC}
              alt="Gamble Aware"
              loading="eager"
            />
          </div>
          <div className={style.partnersBlock}>
            <Image className={style.blockGray} src={gc} alt="Game care" />
            <Image
              className={style.blockColor}
              src={gcC}
              alt="Game care"
              loading="eager"
            />
          </div>
          <div className={style.partnersBlock}>
            <Image
              className={style.blockGray}
              src={gt}
              alt="gambling Therapy"
            />
            <Image
              className={style.blockColor}
              src={gtC}
              alt="gambling Therapy"
              loading="eager"
            />
          </div>
          <div className={style.partnersBlock}>
            <Image className={style.blockGray} src={gb} alt="Gamban" />
            <Image
              className={style.blockColor}
              src={gbC}
              alt="Gamban"
              loading="eager"
            />
          </div>
          <div className={style.partnersBlock}>
            <Image className={style.blockGray} src={bb} alt="BetBlocker" />
            <Image
              className={style.blockColor}
              src={bbC}
              alt="BetBlocker"
              loading="eager"
            />
          </div>
          <div className={style.partnersBlock}>
            <Image className={style.blockGray} src={itl} alt="ITech Labs" />
            <Image
              className={style.blockColor}
              src={itlC}
              alt="ITech Labs"
              loading="eager"
            />
          </div>
          <div className={style.partnersBlock}>
            <Image className={style.blockGray} src={ec} alt="Ecogra" />
            <Image
              className={style.blockColor}
              src={ecC}
              alt="Ecogra"
              loading="eager"
            />
          </div>
        </div>
        <div>
          <p className={style.copyright}>
            <span className={style.copyrightLeft}>18+</span>
            <span className={style.copyrightRight}>
              Copyright © {getYear()} {data.title}
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
