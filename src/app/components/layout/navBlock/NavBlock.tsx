'use client';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import style from './navBlock.module.css';
import styleHeader from '../styles/header.module.css';

const MAIN_NAV_LINKS = [
  { href: '/', label: 'Main' },
  { href: '/games', label: 'Games' },
  { href: '/rewards', label: 'Rewards' },
  { href: '/resorts', label: 'Resorts' },
  { href: '/first-day-tips', label: 'First Day Tips' },
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
        {MAIN_NAV_LINKS.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                className={isActive ? style.active : undefined}
                aria-current={isActive ? 'page' : undefined}
                onClick={onLinkClick}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBlock;
