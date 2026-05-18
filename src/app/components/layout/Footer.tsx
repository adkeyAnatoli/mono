'use client';

import style from './styles/footer.module.css';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { getYear } from '@/src/app/utils/getYear';
import LinkToElement from '../links/LinkToElement';
import logo from '@/public/svg/logo-footer.svg';
import cwLogo from '@/public/footer/CW.svg';
import { Link } from '@/src/i18n/navigation';
import Operator from './footer/Operator';
import Provider from './footer/Provider';

const Footer = () => {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? '';
  const t = useTranslations('footer');

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
                <li className={style.legalNavItem}>
                  <Link href="/about" className={style.legalLink}>
                    About
                  </Link>
                </li>
                <li className={style.legalNavItem}>
                  <Link href="/terms" className={style.legalLink}>
                    Terms
                  </Link>
                </li>
                <li className={style.legalNavItem}>
                  <Link href="/privacy" className={style.legalLink}>
                    Privacy
                  </Link>
                </li>
                <li className={style.legalNavItem}>
                  <Link href="/faq" className={style.legalLink}>
                    FAQ
                  </Link>
                </li>
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
                Copyright © {getYear()} {t('title')}
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
