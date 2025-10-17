'use client';
import Link from 'next/link';
import React from 'react';
import style from './navBlock.module.css';
import styleHeader from '../layout/styles/header.module.css';
import { usePathname } from 'next/navigation';

const NavBlock: React.FC<{ open: boolean }> = ({ open }) => {
  const navList = [
    { href: '/bonus', name: 'Bonus' },
    { href: '/app', name: 'App' },
    { href: '/login', name: 'Log In' },
  ];

  const pathname = usePathname();
  return (
    <nav className={`${style.navBlock} ${styleHeader.navBlock}`}>
      <ul className={`${style.ulBlock} ${open ? style.open : ''}`}>
        {navList.map((navElement, index) => (
          <li key={index}>
            <Link
              href={navElement.href}
              className={pathname === navElement.href ? `${style.active}` : ''}
            >
              {navElement.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBlock;
