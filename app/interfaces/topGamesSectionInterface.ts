import { IGame, IOffer } from './mainInterfaces';

export interface ITopGamesSectionProps {
  data: IGame[];
  offer: IOffer;
}

export interface ITopGameProps {
  game: IGame;
  link: string;
  id: number;
}
