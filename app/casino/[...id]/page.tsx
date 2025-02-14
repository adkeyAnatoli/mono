'use client';

import { use, useEffect } from 'react';
import { useRedirect } from '@/app/context/RedirectContext';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function RedirectPage({ params }: Props) {
  const { id } = use(params);
  const { link } = useRedirect();
  const newID = Number(id)
  console.log(id)
  useEffect(() => {
    if (link) {
      window.location.href = link;
    }
  }, [link]);

  return (
    <>
      <Header link={link!} id={newID} />

      <main>
        <div className="loader-body" id="loader">
          <div className="loader"></div>
        </div>
      </main>

      <Footer />
    </>
  );
}
