'use client';
import React from 'react';
import Image from 'next/image';
import style from './styles/header.module.css';
import LinkToElement from '../links/LinkToElement';
import Link from 'next/link';
import ButtonLink from '../buttons/ButtonLink';
import { IHeader } from '@/src/app/interfaces/headerInterface';
import LocaleSwitcher from '../localeSwitch/LocalSwitch';
import { useTranslations } from 'next-intl';

const Header: React.FC<IHeader> = ({ link, id, isHomePage }) => {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME;

  const t = useTranslations('header_section');

  const WIDTH_LOGO = 198;
  const HEIGHT_LOGO = 30;
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
              <ButtonLink
                link={link}
                id={id}
                text={t('login')}
                classes={style.signUp}
              />
              <ButtonLink
                link={link}
                id={id}
                text={t('signUp')}
                classes={style.register}
              />
            </div>
          </>
        ) : (
          <>
            <Link href="/">
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
                <button className={style.signUp}>{t('login')}</button>
              </Link>
              <Link href="/">
                <button className={style.register}>{t('signUp')}</button>
              </Link>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
