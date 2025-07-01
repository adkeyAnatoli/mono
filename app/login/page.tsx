import { url } from '../layout';
import LogInContent from './LogInContent';

export const metadata = {
  title: 'Facilito Bet Venezuela: guía completa de inicio de sesión para jugadores',
  alternates: {
    canonical: `https://${url}/login`,
  },
  description:
    'Facilito Bet Venezuela ofrece un proceso de registro, depósitos y bonificaciones claro. Aprende a verificar tu cuenta, realizar apuestas y retirar fondos de forma segura. Empieza ahora con nuestra guía fácil de seguir.',
};

export default function GamesPage() {
  return <LogInContent />;
}
