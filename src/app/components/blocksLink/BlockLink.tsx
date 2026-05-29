'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { useCasinoRedirect } from '../../hooks/useCasinoRedirect';

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
