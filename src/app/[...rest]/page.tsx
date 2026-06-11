'use client';

import Link from 'next/link';
import ui from '@/src/app/data/siteUi.json';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function CatchAllPage() {
  return (
    <>
      <Header isHomePage={false} />
      <main className="not-found container">
        <h2 className="not-found-title">404</h2>
        <p className="not-found-content">{ui.notFoundPage.textOne}</p>
        <p className="not-found-content">{ui.notFoundPage.textTwo}</p>
        <Link href="/">
          <button className="button-primary">{ui.notFoundPage.back}</button>
        </Link>
      </main>
      <Footer />
    </>
  );
}
