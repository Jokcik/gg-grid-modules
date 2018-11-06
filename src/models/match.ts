import {BestOf, IMatch} from '../interfaces/match.interface';
import {IPlayer} from '../interfaces/player.interface';

export class Match implements IMatch {
  _id: string = Math.random().toString(36).substr(2, 14);

  bo: BestOf = BestOf.BO1;
  players: IPlayer[] = [];
  scores: number[] = [];

  get closed() {
    return this.scores.some(score => score >= this.bo);
  }

  get winner() {
    if (!this.closed) { return null; }
    if (this.scores[0] > this.scores[1]) { return this.players[0]; }
    if (this.scores[1] > this.scores[0]) { return this.players[1]; }

    return null;
  }

  get loser() {
    if (!this.closed) { return null; }
    if (this.scores[0] < this.scores[1]) { return this.players[0]; }
    if (this.scores[1] < this.scores[0]) { return this.players[1]; }

    return null;
  }

  clear(): void {
    delete this.scores[0];
    delete this.scores[1];
  }

  setScore(scorePlayer1: number, scorePlayer2: number) {
    this.scores[0] = scorePlayer1;
    this.scores[1] = scorePlayer2;
  }

}