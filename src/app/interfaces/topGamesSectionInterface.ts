import { IGame } from './mainInterfaces';

export interface ITopGamesSectionProps {
  data: IGame[];
}

export interface ITopGameProps {
  game: IGame;
  link: string;
  id: number;
}
