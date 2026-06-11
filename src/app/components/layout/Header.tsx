import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import style from './styles/header.module.css';
import LinkToElement from '../links/LinkToElement';
import { IHeader } from '@/src/app/interfaces/headerInterface';
import ui from '@/src/app/data/siteUi.json';
import ButtonLinkFirstOffer from '../buttons/ButtonLinkFirstOffer';

const Header: React.FC<IHeader> = ({ isHomePage }) => {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME;

  const WIDTH_LOGO = 340;
  const HEIGHT_LOGO = 35;

  const logo = (
    <Image
      src="/svg/logo.svg"
      width={WIDTH_LOGO}
      height={HEIGHT_LOGO}
      alt={`${siteName} Logo`}
      title={`${siteName} Logo`}
      priority
    />
  );

  return (
    <header className={style.header}>
      <div className={`${style.wrapper} container`}>
        <div className={style.logoBlock}>
          {isHomePage ? (
            <LinkToElement data={{ href: 'main', title: '', key: 1 }}>
              {logo}
            </LinkToElement>
          ) : (
            <Link href="/" style={{ height: `${HEIGHT_LOGO}px` }}>
              {logo}
            </Link>
          )}
        </div>
        <div className={style.headerButtonBlock}>
          {isHomePage ? (
            <ButtonLinkFirstOffer text={ui.playNow} classes={style.register} />
          ) : (
            <Link href="/" className={style.register}>
              {ui.playNow}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
