'use client';
import { IButtonFirstOffer } from '@/src/app/interfaces/buttonLinkProps';
import React from 'react';
import { useWebsite } from '../../context/WebsiteProvider';
// import Link from 'next/link';

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
  if (!website) return <button className={classes}>{text}</button>;

  const offer = website.offers[0];

  return (
    <button onClick={handleClick} className={classes}>
      {text}
    </button>
  );
};

export default ButtonLinkFirstOffer;
