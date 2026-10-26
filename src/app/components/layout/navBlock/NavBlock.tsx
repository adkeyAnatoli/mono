'use client';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import style from './navBlock.module.css';
import styleHeader from '../styles/header.module.css';

const MAIN_NAV_LINKS = [
  { href: '/', label: 'Main' },
  { href: '/resorts', label: 'Resorts' },
  { href: '/casino-games', label: 'Casino Games' },
  { href: '/rewards-program', label: 'Rewards Program' },
  { href: '/app', label: 'App' },
  { href: '/rules-and-payouts', label: 'Rules and Payouts' },
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
