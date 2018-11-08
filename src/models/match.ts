import {BestOf, IMatch} from '../interfaces/match.interface';
import {Exclude, Expose, plainToClass, Transform} from 'class-transformer';
import {Player} from './player';

@Exclude()
export class Match implements IMatch {
  @Expose()
  _id: string = Math.random().toString(36).substr(2, 14);

  @Expose()
  bo: BestOf = BestOf.BO1;
  @Expose()
  scores: number[] = [];

  @Expose()
  @Transform((values: Player[]) => values.map(value => value.id), { toPlainOnly: true })
  @Transform((values: Player[]) => values.map(value => plainToClass(Player, value)), { toClassOnly: true })
  players: Player[] = [];

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