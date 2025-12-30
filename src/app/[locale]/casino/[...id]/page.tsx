'use client';
import Footer from '@/src/app/components/layout/Footer';
import Header from '@/src/app/components/layout/Header';
import { useEffect } from 'react';

export default function RedirectPage() {
  useEffect(() => {
    const link = sessionStorage.getItem('redirectLink');

    if (link) {
      sessionStorage.removeItem('redirectLink');
      setTimeout(() => window.location.replace(link), 900);
    } else {
      setTimeout(() => window.location.replace('/'), 1000);
    }
  }, []);

  return (
    <>
      <Header isHomePage={false} />
      <main>
        <div className="loader-body" id="loader">
          <div className="loader"></div>
        </div>
      </main>
      <Footer />
    </>
  );
}
