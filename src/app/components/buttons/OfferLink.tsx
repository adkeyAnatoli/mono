'use client';

import Link from 'next/link';
import React, { ReactNode } from 'react';
import { useCasinoRedirect } from '@/app/hooks/useCasinoRedirect';

type Props = {
  id: number;
  link: string;
  className?: string;
  children: ReactNode;
};

export default function OfferLink({ id, link, className, children }: Props) {
  const handleRedirect = useCasinoRedirect();

  return (
    <Link
      href={`/casino/${id}`}
      onClick={handleRedirect(id, link)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </Link>
  );
}
