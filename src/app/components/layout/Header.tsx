'use client';
import React from 'react';
import Image from 'next/image';
import style from './styles/header.module.css';
import LinkToElement from '../links/LinkToElement';
import Link from 'next/link';
import { IHeader } from '@/src/app/interfaces/headerInterface';
import LocaleSwitcher from '../localeSwitch/LocalSwitch';
import { useTranslations } from 'next-intl';
import ButtonLinkFirstOffer from '../buttons/ButtonLinkFirstOffer';

const Header: React.FC<IHeader> = ({ isHomePage }) => {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME;

  const t = useTranslations('header_section');

  const WIDTH_LOGO = 231;
  const HEIGHT_LOGO = 46;
  return (
    <header className={style.header}>
      <div className={`${style.wrapper} container`}>
        {isHomePage ? (
          <>
            <LinkToElement data={{ href: 'main', title: '', key: 1 }}>
              <Image
                src="/svg/logo.svg"
                width={WIDTH_LOGO}
                height={HEIGHT_LOGO}
                alt={`${siteName} Logo`}
                title={`${siteName} Logo`}
                priority
              />
            </LinkToElement>
            <div className={style.headerButtonBlock}>
              <LocaleSwitcher />
              <ButtonLinkFirstOffer
                text={t('playNow')}
                classes={style.register}
              />
            </div>
          </>
        ) : (
          <>
            <Link href="/" style={{ height: `${HEIGHT_LOGO}` }}>
              <Image
                src="/svg/logo.svg"
                width={WIDTH_LOGO}
                height={HEIGHT_LOGO}
                alt="Logo"
                priority
              />
            </Link>
            <div className={style.headerButtonBlock}>
              <LocaleSwitcher />
              <Link href="/">
                <button className={style.register}>{t('playNow')}</button>
              </Link>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
