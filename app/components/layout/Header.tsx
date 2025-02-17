'use client';
import React from 'react';
import Image from 'next/image';
import style from './styles/header.module.css';
import LinkToElement from '../links/LinkToElement';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import ButtonLink from '../buttons/ButtonLink';
import { IHeader } from '@/app/interfaces/headerInterface';

const Header: React.FC<IHeader> = ({ link, id }) => {
  const router = usePathname();
  const isHomePage = router === '/';
  return (
    <header className={style.header}>
      <div className={`${style.wrapper} container`}>
        {isHomePage ? (
          <>
            <LinkToElement data={{ href: 'main', title: '', key: 1 }}>
              <Image
                src="/svg/logo.svg"
                width={165}
                height={48}
                alt="Logo"
                priority
              />
            </LinkToElement>
            <div className={style.headerButtonBlock}>
              <ButtonLink
                link={link}
                id={id}
                text={'Sign Up'}
                classes={style.signUp}
              />
              <ButtonLink
                link={link}
                id={id}
                text={'Register'}
                classes={style.register}
              />
            </div>
          </>
        ) : (
          <>
            <Link href="/">
              <Image
                src="/svg/logo.svg"
                width={165}
                height={48}
                alt="Logo"
                priority
              />
            </Link>
            <div className={style.headerButtonBlock}>
              <Link href="/">
                <button className={style.signUp}>Sign Up</button>
              </Link>
              <Link href="/">
                <button className={style.register}>Register</button>
              </Link>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
