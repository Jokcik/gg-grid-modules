export const EMPTY_PLAYER = 'empty';

export class Stat {
  score1: number = 0;
  score2: number = 0;

  win: string;
  loss: string;
}

export enum BestOf {
  BO1 = 1,
  BO3 = 2,
  BO5 = 3,
  BO7 = 4,
  BO9 = 5,
  BO11 = 6,
}

export class Match {
  player1: string;
  player2: string;

  bo: BestOf = BestOf.BO1;
  closed: boolean = false;
  isThird: boolean;

  stat: Stat = new Stat();

  public winPlayer1(onScore: number) {
    if (this.closed) { return this.closed; }
    this.stat.score1 += onScore;

    if (this.stat.score1 >= this.bo) {
      this.closed = true;
      this.stat.win = this.player1;
      this.stat.loss = this.player2;
    }

    return this.closed;
  }

  public winPlayer2(onScore: number) {
    if (this.closed) { return this.closed; }
    this.stat.score2 += onScore;

    if (this.stat.score2 >= this.bo) {
      this.closed = true;
      this.stat.win = this.player2;
      this.stat.loss = this.player1;
    }

    return this.closed;
  }

  static getNextMatchId(matchId: number) {
    return Math.floor(matchId / 2);
  }
}