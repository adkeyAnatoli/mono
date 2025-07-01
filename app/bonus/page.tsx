import { url } from '../layout';
import BonusContent from './BonusContent';

export const metadata = {
  title: 'Bonos de Facilito Bet Venezuela: reembolsos, apuestas gratuitas y cashback',
  alternates: {
    canonical: `https://${url}/bonus`,
  },
  description:
    'Facilito Bet Venezuela ofrece bonos de bienvenida, reembolsos, apuestas gratuitas y promociones de recarga a sus usuarios. Consulte las últimas ofertas, lea las condiciones y empiece a jugar hoy mismo.',
};

export default function GamesPage() {
  return <BonusContent />;
}
