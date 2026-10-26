'use client';
import { useCasinoRedirect } from '@/app/hooks/useCasinoRedirect';
import Link from 'next/link';
import React, { ReactNode } from 'react';
interface BlockLinkProps {
  children: ReactNode;
  link: string;
  id: number;
  classes: string;
}
const BlockLink: React.FC<BlockLinkProps> = ({
  children,
  link,
  id,
  classes,
}) => {
  const handleRedirect = useCasinoRedirect();
  return (
    // <button onClick={handleClick} className={classes}>
    //   {children}
    // </button>
    <Link
      href={`/casino/${id}`}
      onClick={handleRedirect(id, link)}
      target="_blank"
      rel="noopener noreferrer"
      className={classes}
    >
      {children}
    </Link>
  );
};

export default BlockLink;
