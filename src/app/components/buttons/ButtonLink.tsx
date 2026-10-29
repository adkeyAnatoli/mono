'use client';

import React from 'react';
import OfferLink from './OfferLink';

type Props = {
  text: string;
  link: string;
  classes: string;
  id: number;
};

const ButtonLink: React.FC<Props> = ({ id, text, link, classes }) => (
  <OfferLink id={id} link={link} className={classes}>
    {text}
  </OfferLink>
);

export default ButtonLink;
