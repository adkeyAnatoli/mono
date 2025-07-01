'use client';
import { IButton } from '@/app/interfaces/buttonLinkProps';
import React from 'react';
// import Link from 'next/link';

const ButtonLink: React.FC<IButton> = ({ id, text, link, classes }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    sessionStorage.setItem('redirectLink', link);
    window.open(`/casino/${id}`, '_blank');
  };

  return (
    <button 
      onClick={handleClick}
      className={classes}
    >
      {text}
    </button>
  );
};

export default ButtonLink;
