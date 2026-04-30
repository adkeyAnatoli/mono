import Link from 'next/link';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import { uiPhrases } from '@/app/data/uiPhrases';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="not-found container">
        <h2 className="not-found-title">404</h2>
        <p className="not-found-content">{uiPhrases.notFoundPageMissing}</p>
        <p className="not-found-content">{uiPhrases.notFoundPageMoved}</p>
        <Link href="/">
          <button className="button-primary">{uiPhrases.homePage}</button>
        </Link>
      </main>
      <Footer />
    </>
  );
}
