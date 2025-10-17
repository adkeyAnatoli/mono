'use client';
import React, { useState } from 'react';
import NavBlock from '../navBlock/NavBlock';

export const ClientHamburger: React.FC = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <NavBlock open={isOpen} />
      <div
        className={`hamburger ${isOpen ? 'open' : ''}`}
        onClick={() => setOpen(!isOpen)}
      ></div>
    </>
  );
};
