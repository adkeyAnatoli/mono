'use client';

import style from './styles/footer.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import footerData from '@/src/app/data/dataFooter.json';
import { getYear } from '@/src/app/utils/getYear';
import LinkToElement from '../links/LinkToElement';
import logo from '@/public/svg/logo-footer.svg';
import cwLogo from '@/public/footer/CW.svg';
import Operator from './footer/Operator';
import Provider from './footer/Provider';

const LEGAL_LINKS = [
  { href: '/faq', label: 'FAQ' },
  { href: '/terms', label: 'Terms' },
  { href: '/privacy', label: 'Privacy' },
] as const;

const Footer = () => {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? '';
  const pathname = usePathname();

  return (
    <footer className={style.footer}>
      <div className={`${style.footerContainer} container`}>
        <div className={style.footerTop}>
          <div className={style.footerBrand}>
            <div className={style.footerLogoContainer}>
              <LinkToElement data={{ href: 'main', title: '', key: 1 }}>
                <Image
                  src={logo}
                  alt={`${siteName} Logo`}
                  title={`${siteName} Logo`}
                  priority
                />
              </LinkToElement>
            </div>
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
        </div>
        <div className={style.footerMiddle}>
          <Operator siteName={siteName} />
        </div>
        <div className={style.footerBottom}>
          <div className={style.footerBottomProvider}>
            <Image
              className={style.footerCwLogo}
              src={cwLogo}
              alt={`${siteName} license`}
              title={`${siteName} license`}
              loading="lazy"
            />
            <Provider siteName={siteName} />
          </div>
          <div className={style.footerBottomGroup}>
            <p className={style.copyright}>
              <span className={style.copyrightLeft}>18+</span>
              <span className={style.copyrightRight}>
                Copyright © {getYear()} {footerData.title}
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
