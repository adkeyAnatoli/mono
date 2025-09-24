'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import style from './styles/header.module.css';
import LinkToElement from '../links/LinkToElement';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import ButtonLink from '../buttons/ButtonLink';
import { IHeader } from '@/src/app/interfaces/headerInterface';
import NavBlock from '../navBlock/NavBlock';

const Header: React.FC<IHeader> = ({ link, id }) => {
  const [isOpen, setOpen] = useState(false);
  const router = usePathname();
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME;
  const isHomePage = router === '/';
  // const firstButton = 'Log In';
  const secondButton = 'Play Now';
  const WIDTH_LOGO = 154;
  const HEIGHT_LOGO = 27;
  return (
    <header className={style.header}>
      <div className={`${style.wrapper} container`}>
        {isHomePage ? (
          <>
            <div className={style.logoBlock}>
              <div
                className={`hamburger ${isOpen ? 'open' : ''}`}
                onClick={() => setOpen(!isOpen)}
              ></div>
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
            </div>
            <div className={style.headerButtonBlock}>
              <NavBlock open={isOpen} />
              <ButtonLink
                link={link}
                id={id}
                text={secondButton}
                classes={style.register}
              />
            </div>
          </>
        ) : (
          <>
            <div className={style.logoBlock}>
              <div
                className={`hamburger ${isOpen ? 'open' : ''}`}
                onClick={() => setOpen(!isOpen)}
              ></div>
              <Link href="/">
                <Image
                  src="/svg/logo.svg"
                  width={WIDTH_LOGO}
                  height={HEIGHT_LOGO}
                  alt={`${siteName} Logo`}
                  title={`${siteName} Logo`}
                  priority
                />
              </Link>
            </div>
            <div className={style.headerButtonBlock}>
              <NavBlock open={isOpen} />
              <ButtonLink
                link={link}
                id={id}
                text={secondButton}
                classes={style.register}
              />
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
