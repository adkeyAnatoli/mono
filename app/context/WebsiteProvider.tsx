'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { IWebsite } from '@/app/interfaces/mainInterfaces';

type WebsiteContextType = {
  website: IWebsite | null;
};

const WebsiteContext = createContext<WebsiteContextType>({ website: null });

export function WebsiteProvider({ children }: { children: React.ReactNode }) {
  const idSite = process.env.NEXT_PUBLIC_SITE_ID!;
  const [website, setWebsite] = useState<IWebsite | null>(null);

  useEffect(() => {
    if (!website) {
      fetch(`https://api.adkey-seo.com/api/website/get-website/${idSite}`)
        .then((res) => res.json())
        .then((data) => setWebsite(data))
        .catch(console.error);
    }
  }, [idSite, website]);

  return (
    <WebsiteContext.Provider value={{ website }}>
      {children}
    </WebsiteContext.Provider>
  );
}

export function useWebsite() {
  return useContext(WebsiteContext);
}
