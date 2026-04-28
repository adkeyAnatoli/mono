'use client';
import { IButtonFirstOffer } from '@/app/interfaces/buttonLinkProps';
import React from 'react';
import { useWebsite } from '../../context/WebsiteProvider';
import Link from 'next/link';

const ButtonLinkFirstOffer: React.FC<IButtonFirstOffer> = ({
  text,
  classes,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    sessionStorage.setItem('redirectLink', offer.link);
    window.open(`/casino/${offer.id}`, '_blank');
  };
  const { website } = useWebsite();
  if (!website)
    return (
      <Link
        href={`#`}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
        {text}
      </Link>
    );

  const offer = website.offers[0];

  return (
    <Link
      href={`/casino/${offer.id}`}
      onClick={handleClick}
      className={classes}
      target="_blank"
      rel="noopener noreferrer"
    >
      {text}
    </Link>
  );
};

export default ButtonLinkFirstOffer;
