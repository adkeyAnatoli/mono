'use client';
import { IButton } from '@/app/interfaces/buttonLinkProps';
import React from 'react';
import { useRedirect } from '@/app/context/RedirectContext';
import Link from 'next/link';

const ButtonLink: React.FC<IButton> = ({ id, text, link, classes }) => {
  const { setLink } = useRedirect();
  const handleClick = () => {
    setLink(link);
  };

  return (
    <Link href={`/casino/${id}`} onClick={handleClick}>
      <button className={classes}>{text}</button>
    </Link>
  );
};

export default ButtonLink;
