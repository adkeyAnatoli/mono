'use client';

import { IButtonFirstOffer } from '@/src/app/interfaces/buttonLinkProps';
import React from 'react';
import NextLink from 'next/link';
import { Link } from '@/src/i18n/navigation';
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
      <NextLink
        href="#"
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
        {text}
      </NextLink>
    );
  }

  const offer = website.offers[0];

  return (
    <Link
      href={{
        pathname: '/casino/[...id]',
        params: { id: [String(offer.id)] },
      }}
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
