'use client';
import React, { useCallback } from 'react';

export function useCasinoRedirect() {
  return useCallback((id: number, link: string) => {
    return (e: React.MouseEvent) => {
      if (e.defaultPrevented) return;
      e.preventDefault();
      sessionStorage.setItem('redirectLink', link);
      window.open(`/casino/${id}`, '_blank');
    };
  }, []);
}
