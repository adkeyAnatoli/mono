'use client';

import { createContext, useContext, useState } from 'react';

interface RedirectContextType {
  link: string | null;
  setLink: (url: string) => void;
}

const RedirectContext = createContext<RedirectContextType | undefined>(
  undefined
);

export const RedirectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [link, setLink] = useState<string | null>(null);

  return (
    <RedirectContext.Provider value={{ link, setLink }}>
      {children}
    </RedirectContext.Provider>
  );
};

export const useRedirect = () => {
  const context = useContext(RedirectContext);
  if (!context) {
    throw new Error('useRedirect must be used within a RedirectProvider');
  }
  return context;
};
