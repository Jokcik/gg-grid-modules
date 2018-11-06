import {IPlayer} from './player.interface';

export enum BestOf {
  BO1 = 1,
  BO3 = 2,
  BO5 = 3,
  BO7 = 4,
  BO9 = 5,
  BO11 = 6,
}

export interface IMatch {
  _id: string;

  players: IPlayer[];
  scores: number[];
  bo: BestOf;

  closed: boolean;
  winner: IPlayer;
  loser: IPlayer;

  setScore(scorePlayer1: number, scorePlayer2: number);
  clear(): void;
}
