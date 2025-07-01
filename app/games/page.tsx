import GamesContent from './GamesContent';
import { url } from '@/app/layout';

export const metadata = {
  title: 'Facilito Bet Venezuela: juegos, apuestas combinadas y pagos diarios',
  alternates: {
    canonical: `https://${url}/games`,
  },
  description:
    'Facilito Bet Venezuela ofrece apuestas combinadas, Animalitos, carreras de caballos y juegos de casino con pagos seguros. Descubre ahora los bonos y las apuestas con apuestas bajas: crea tu cuenta y empieza a jugar hoy mismo.',
};

export default function GamesPage() {
  return <GamesContent />;
}
