'use client';
import React, { useState } from 'react';
import NavBlock from './navBlock/NavBlock';

export const ClientHamburger: React.FC = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <NavBlock open={isOpen} onLinkClick={() => setOpen(false)} />
      <button
        type="button"
        className={`hamburger${isOpen ? ' open' : ''}`}
        aria-expanded={isOpen}
        aria-label="Menu"
        onClick={() => setOpen((prev) => !prev)}
      />
    </>
  );
};
