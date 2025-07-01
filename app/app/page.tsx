import { url } from '../layout';
import AppContent from './AppContent';

export const metadata = {
  title: 'Facilito Bet Venezuela sitio móvil: apuestas seguras sobre la marcha',
  alternates: {
    canonical: `https://${url}/app`,
  },
  description:
    'Facilito Bet Venezuela ofrece apuestas móviles seguras, pagos rápidos y acceso completo a tu cuenta desde tu navegador. Prueba los deportes, las apuestas combinadas y mucho más: únete ahora y juega directamente desde tu teléfono.',
};

export default function GamesPage() {
  return <AppContent />;
}
