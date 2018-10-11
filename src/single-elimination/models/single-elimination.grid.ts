import {EMPTY_PLAYER, Match, Stat} from './match';
import {Stage} from './stage';

export class SingleEliminationGrid {
  public stages: Stage[] = [];

  public generateStages(countStages: number): Stage[] {
    this.stages = [];
    for (let i = 1; i <= countStages; ++i) {
      const stage = new Stage();
      const countMatches = Math.pow(2, countStages - i);
      for (let j = 1; j <= countMatches; ++j) {
        const match = new Match();
        stage.matches.push(match);
      }

      // if (countStages === i) {
      //   const thirdMatch = new Match();
      //   thirdMatch.stat.isThird = true;
      //   stage.matches.push(thirdMatch);
      // }

      this.stages.push(stage);
    }


    return this.stages;
  }

  public initFirstStage(players: string[]): Stage[] {
    const stage = this.stages[0];
    const matchLength = stage.matches.length;

    if (players.length < matchLength) { throw new Error('Неверное количество участников'); }
    stage.matches.forEach(match => match.player1 = players.pop());
    const needPlayers = matchLength - players.length;
    players.push(...Array(needPlayers).fill(EMPTY_PLAYER));
    // players = _.shuffle(players);
    stage.matches.forEach(match => match.player2 = players.pop());

    return this.stages;
  }

  public winEmptyPlayers(stageId: number): Stage[] {
    const stage = this.stages[stageId];
    const nextStage = this.stages[stageId + 1];
    if (!nextStage) { throw new Error('Нет следующего stage для перехода'); }

    stage.matches.forEach((match, idx) => {
      if (match.player2 !== EMPTY_PLAYER) { return; }
      nextStage.playerNextStage(idx, match.stat.win);
    });

    return this.stages;
  }

  public winPlayerInMatch(stageId: number, matchId: number, playerId: string, score: number) {
    const match = this.stages[stageId].matches[matchId];
    if (match.player1 !== playerId && match.player2 !== playerId) { return match; }

    let closed: boolean = false;
    const isFirstPlayer = match.player1 === playerId;
    if (isFirstPlayer) {
      closed = match.winPlayer1(score);
    } else {
      closed = match.winPlayer2(score);
    }

    if (closed && this.stages.length !== stageId + 1) {
      this.stages[stageId + 1].playerNextStage(matchId, match.stat.win);
      const thirdMatch = this.stages[this.stages.length - 1].matches[1];
      if (this.stages.length - 2 === stageId && thirdMatch) {

        if (matchId === 0) {
          thirdMatch.player1 = match.stat.loss;
        } else {
          thirdMatch.player2 = match.stat.loss;
        }
      }
    }

    return match;
  }

  public cancelResultMatch(stageId: number, matchId: number) {
    let currentMatchId = matchId;
    const players = [];
    for (let i = stageId; i < this.stages.length; ++i) {
       const match = this.stages[i].matches[currentMatchId];

       match.stat = new Stat();
       match.closed = false;
       if (currentMatchId !== matchId) {
         if (players.includes(match.player1)) {
           delete match.player1;
         } else if (players.includes(match.player2)) {
           delete match.player2;
         }
       }

       players.push(match.player1, match.player2);
       currentMatchId = Math.floor(currentMatchId / 2);
    }
  }

  public addThird(): SingleEliminationGrid {
    const match = new Match();
    match.isThird = true;
    this.stages[this.stages.length - 1].matches.push(match);
    return this;
  }

  public addSuperFinal() {
    const stage = new Stage();
    stage.matches.push(new Match());
    this.stages.push(stage);

    return this;
  }

  public static generateGrid(players: string[]) {
    players = players.slice();

    const countStages = Math.ceil(Math.log2(players.length));
    const grid = new SingleEliminationGrid();
    grid.generateStages(countStages);
    // grid.initFirstStage(_.shuffle(players));
    grid.initFirstStage(players);
    grid.winEmptyPlayers(0);

    // grid.winPlayerInMatch(2, 1, '2', 1);

    // grid.cancelResultMatch(0, 1);

    return grid;
  }
}