'use client';

import React from 'react';
import { Link } from '@/src/i18n/navigation';
import { IButton } from '../../interfaces/buttonLinkProps';
import { useCasinoRedirect } from '../../hooks/useCasinoRedirect';

const ButtonLink: React.FC<IButton> = ({ id, text, link, classes }) => {
  const handleRedirect = useCasinoRedirect();

  return (
    <Link
      href={{ pathname: '/casino/[...id]', params: { id: [String(id)] } }}
      onClick={handleRedirect(id, link)}
      target="_blank"
      rel="noopener noreferrer"
      className={classes}
    >
      {text}
    </Link>
  );
};

export default ButtonLink;
