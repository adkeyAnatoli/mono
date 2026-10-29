'use client';

import React from 'react';
import Link from 'next/link';
import OfferLink from './OfferLink';
import { useFirstOffer } from '@/app/hooks/useFirstOffer';

type Props = {
  text: string;
  classes: string;
};

const ButtonLinkFirstOffer: React.FC<Props> = ({ text, classes }) => {
  const offer = useFirstOffer();

  if (!offer) {
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

  return (
    <OfferLink id={offer.id} link={offer.link} className={classes}>
      {text}
    </OfferLink>
  );
};

export default ButtonLinkFirstOffer;
