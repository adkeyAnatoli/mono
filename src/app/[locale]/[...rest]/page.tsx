import { useTranslations } from 'next-intl';

import '../globals.css';
import { Link } from '@/src/i18n/navigation';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

export default function CatchAllPage() {
  const t = useTranslations('notFoundPage');
  return (
    <>
      <Header link={''} id={0} isHomePage={false} />
      <main className="not-found container">
        <h2 className="not-found-title">404</h2>
        <p className="not-found-content">{t('textOne')}</p>
        <p className="not-found-content">{t('textTwo')}</p>
        <Link href="/">
          <button className="button-primary">{t('back')}</button>
        </Link>
      </main>
      <Footer />
    </>
  );
}
