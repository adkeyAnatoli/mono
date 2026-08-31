'use client';
import React, { ReactNode } from 'react';
import { goToBLock } from '@/app/utils/goToBlock';

interface ILinkProps {
  data: {
    title: string;
    href: string;
    key: number;
  };
  children?: ReactNode;
}

const LinkToElement: React.FC<ILinkProps> = ({ data, children }) => {
  return (
    <p style={{ cursor: 'pointer' }} onClick={() => goToBLock(data.href)}>
      {children || data.title}
    </p>
  );
};

export default LinkToElement;
