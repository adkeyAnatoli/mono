'use client';

import React, { ReactNode } from 'react';
import OfferLink from '../buttons/OfferLink';

type Props = {
  children: ReactNode;
  link: string;
  id: number;
  classes: string;
};

const BlockLink: React.FC<Props> = ({ children, link, id, classes }) => (
  <OfferLink id={id} link={link} className={classes}>
    {children}
  </OfferLink>
);

export default BlockLink;
