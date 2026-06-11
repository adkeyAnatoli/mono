'use client';

import { useCallback, type MouseEvent } from 'react';

export function useCasinoRedirect() {
  return useCallback(
    (id: number, link: string) => (e: MouseEvent<HTMLElement>) => {
      e.preventDefault();
      sessionStorage.setItem('redirectLink', link);
      window.open(`/casino/${id}`, '_blank');
    },
    []
  );
}
