'use client';

import { IButtonFirstOffer } from '@/src/app/interfaces/buttonLinkProps';
import React from 'react';
import Link from 'next/link';
import { useWebsite } from '../../context/WebsiteProvider';
import { useCasinoRedirect } from '../../hooks/useCasinoRedirect';

const ButtonLinkFirstOffer: React.FC<IButtonFirstOffer> = ({
  text,
  classes,
}) => {
  const { website } = useWebsite();
  const handleRedirect = useCasinoRedirect();

  if (!website) {
    return (
      <Link
        href="#"
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
        {text}
      </Link>
    );
  }

  const offer = website.offers[0];

  return (
    <Link
      href={`/casino/${offer.id}`}
      onClick={handleRedirect(offer.id, offer.link)}
      className={classes}
      target="_blank"
      rel="noopener noreferrer"
    >
      {text}
    </Link>
  );
};

export default ButtonLinkFirstOffer;
