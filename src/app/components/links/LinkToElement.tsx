'use client';
import React, { ReactNode, MouseEvent } from 'react';
import { goToBLock } from '@/src/app/utils/goToBlock';
// import styles from './LinkToElement.module.css';

interface ILinkProps {
  data: {
    title: string;
    href: string;
    key: number;
  };
  children?: ReactNode;
}

const LinkToElement: React.FC<ILinkProps> = ({ data, children }) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    goToBLock(data.href);
  };

  return (
    <a href={'/'} onClick={handleClick}>
      {children || data.title}
    </a>
  );
};

export default LinkToElement;
