'use client';

import React, { ReactNode } from 'react';
import { Link } from '@/src/i18n/navigation';
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
      href={{ pathname: '/casino/[...id]', params: { id: [String(id)] } }}
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
