'use client';
import React, { ReactNode } from 'react';
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
      {children}
    </button>
  );
};

export default BlockLink;
