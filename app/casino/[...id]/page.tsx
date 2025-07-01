'use client';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

export default function RedirectPage() {
  const params = useParams();
  const { id } = params;
  const newID = Number(id);

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
      <Header link="" id={newID} />
      <main>
        <div className="loader-body" id="loader">
          <div className="loader"></div>
        </div>
      </main>
      <Footer />
    </>
  );
}
