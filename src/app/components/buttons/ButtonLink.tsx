'use client';
import { IButton } from '@/app/interfaces/buttonLinkProps';
import React from 'react';
import Link from 'next/link';
import { useCasinoRedirect } from '@/app/hooks/useCasinoRedirect';

const ButtonLink: React.FC<IButton> = ({ id, text, link, classes }) => {
  const handleRedirect = useCasinoRedirect();

  return (
    <Link
      href={`/casino/${id}`}
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
