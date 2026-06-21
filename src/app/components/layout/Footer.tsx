'use client';

import style from './styles/footer.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getYear } from '@/app/utils/getYear';
import LinkToElement from '../links/LinkToElement';
import logo from '@/public/svg/logo_footer.svg';
import mas from '@/public/payments/mas.svg';
import visa from '@/public/payments/visa.svg';
import net from '@/public/payments/net.svg';
import skr from '@/public/payments/skr.svg';
import crypto from '@/public/payments/crypto.svg';
import ga from '@/public/partners/ga.svg';
import gc from '@/public/partners/gc.svg';
import gt from '@/public/partners/gt.svg';
import g from '@/public/partners/g.svg';
import bb from '@/public/partners/bb.svg';
import eco from '@/public/partners/eco.svg';
import it from '@/public/partners/it.svg';
import data from '@/app/data/dataFooter.json';

const LEGAL_LINKS = [
  { href: '/faq', label: 'FAQ' },
  { href: '/terms', label: 'Terms' },
  { href: '/privacy', label: 'Privacy' },
] as const;

const badgeItems = [
  { src: mas, alt: 'Mastercard', title: 'Mastercard' },
  { src: visa, alt: 'Visa', title: 'Visa' },
  { src: net, alt: 'Neteller', title: 'Neteller' },
  { src: skr, alt: 'Skrill', title: 'Skrill' },
  { src: crypto, alt: 'Bitcoin, Litecoin, Ethereum', title: 'Crypto' },
  { src: ga, alt: 'GambleAware', title: 'Gamble Aware' },
  { src: gc, alt: 'GamCare', title: 'GamCare' },
  { src: gt, alt: 'Gambling Therapy', title: 'Gambling Therapy' },
  { src: g, alt: 'GamBan', title: 'GamBan' },
  { src: bb, alt: 'BetBlocker', title: 'BetBlocker' },
  { src: eco, alt: 'eCOGRA', title: 'eCOGRA' },
  { src: it, alt: 'iTech Labs', title: 'iTech Labs' },
];

const Footer = () => {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME;
  const pathname = usePathname();

  return (
    <footer className={style.footer}>
      <div className={`${style.stack} container`}>
        <div className={style.legalBlock}>
          <nav className={style.legalNav} aria-label="Legal information">
            <ul className={style.legalNavList}>
              {LEGAL_LINKS.map(({ href, label }) => {
                const isActive = pathname === href;
                return (
                  <li className={style.legalNavItem} key={href}>
                    <Link
                      href={href}
                      className={`${style.legalLink}${isActive ? ` ${style.legalLinkActive}` : ''}`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
        <div className={style.badgeArea}>
          <section
            className={style.badgeWrap}
            aria-label="Payment and responsible gambling partners"
          >
            {badgeItems.map((item) => (
              <div key={item.alt} className={style.badgeCell}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  title={`${item.title} in ${siteName}`}
                  loading="lazy"
                  className={style.badgeImg}
                />
              </div>
            ))}
          </section>
        </div>
        <div className={style.bottomBar}>
          <div className={style.logoLink}>
            <LinkToElement data={{ href: 'main', title: '', key: 1 }}>
              <span className={style.logoWrap}>
                <Image
                  src={logo}
                  alt={`${siteName}`}
                  title={`${siteName}`}
                  className={style.imageLogo}
                  priority
                />
              </span>
            </LinkToElement>
          </div>
          <div className={style.bottomRight}>
            <p className={style.legal}>
              <span className={style.legalRest}>
                18+ Copyright © {getYear()} {data.title}
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
