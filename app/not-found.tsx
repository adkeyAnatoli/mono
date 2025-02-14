import Link from 'next/link';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="not-found container">
        <h2 className="not-found-title">404</h2>
        <p className="not-found-content">
          The page you were looking for does not exist.
        </p>
        <p className="not-found-content">
          You may have mistyped the address or the page may have moved.
        </p>
        <button className="button-primary">
          <Link href="/">Home Page</Link>
        </button>
      </main>
      <Footer />
    </>
  );
}
