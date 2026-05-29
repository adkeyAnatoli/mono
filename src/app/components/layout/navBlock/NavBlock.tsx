'use client';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import style from './navBlock.module.css';
import styleHeader from '../styles/header.module.css';
import ui from '@/src/app/data/siteUi.json';

const MAIN_NAV_LINKS = [
  { href: '/bonuses', labelKey: 'bonuses' as const },
  { href: '/registration', labelKey: 'registration' as const },
  { href: '/games', labelKey: 'games' as const },
  { href: '/payments', labelKey: 'payments' as const },
] as const;

const NavBlock: React.FC<{ open: boolean; onLinkClick?: () => void }> = ({
  open,
  onLinkClick,
}) => {
  const pathname = usePathname();

  return (
    <nav
      className={`${style.navBlock} ${styleHeader.navBlock}`}
      aria-label="Main navigation"
    >
      <ul className={`${style.ulBlock} ${open ? style.open : ''}`}>
        {MAIN_NAV_LINKS.map(({ href, labelKey }) => {
          const isActive = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                className={isActive ? style.active : undefined}
                aria-current={isActive ? 'page' : undefined}
                onClick={onLinkClick}
              >
                {ui.nav[labelKey]}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBlock;
