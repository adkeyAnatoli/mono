'use client';

import React, { ReactNode } from 'react';
import { scrollToBlock } from '@/app/utils/scrollToBlock';

type Props = {
  targetId: string;
  children?: ReactNode;
};

const LinkToElement: React.FC<Props> = ({ targetId, children }) => {
  return (
    <p style={{ cursor: 'pointer' }} onClick={() => scrollToBlock(targetId)}>
      {children}
    </p>
  );
};

export default LinkToElement;
