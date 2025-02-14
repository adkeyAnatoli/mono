'use client';
import { useRedirect } from '@/app/context/RedirectContext';
import Link from 'next/link';
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
  const { setLink } = useRedirect();
  const handleClick = () => {
    setLink(link);
  };
  return (
    <Link className={classes} href={`/casino/${id}`} onClick={handleClick}>
      {children}
    </Link>
  );
};

export default BlockLink;
