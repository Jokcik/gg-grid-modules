import {IPlayer} from '../interfaces';

export class Player implements IPlayer {
  id: string;
  rating: number;
  username: string;

  constructor(id?: string) {
    this.id = id;
  }
}

export const EMPTY_PLAYER: IPlayer = new Player('empty');
