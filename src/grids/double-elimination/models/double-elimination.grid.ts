import {DeepDiff, Grid, IGridConfig, IPlayer} from '../../../interfaces';
import {EMPTY_PLAYER, Match, Player, Stage} from '../../../models';
import {SingleEliminationGrid} from '../../single-elimination/models/single-elimination.grid';
import {DoubleDownGrid} from './double-down.grid';
import {classToPlain} from 'class-transformer';
import {diff} from 'deep-diff';

export class DoubleEliminationGrid extends Grid {
  public upGrid: SingleEliminationGrid;
  public downGrid: DoubleDownGrid;

  constructor(private players: IPlayer[],
              private config: IGridConfig) {
    super();
    if (!this.players) { return; }

    this.upGrid = new SingleEliminationGrid(this.players, this.config);
    this.downGrid = new DoubleDownGrid(this.players);
    this.addSuperFinal();

    const startStage = this.upGrid.stages[0];
    for (const match of startStage.matches) {
      if (match.players[1] && match.players[1].id === EMPTY_PLAYER.id) {
        // Чтобы игроки попали в нижнюю сетку
        this.winUpGridPlayer(match, match.bo, 0);
      }
    }
  }

  cancelMatchResultAndRevertMovePlayers(match: Match) {
    // const players = match.players.slice();
    // this.upGrid.cancelMatchResultAndRevertMovePlayers(match);
    //
    //
    //
    // const [stageIdx, matchIdx] = this.getStageAndMatchIdx(match);
    // match.clear();
    //
    // let currentMatchId = matchIdx;
    // const players: Player[] = [];
    // for (let i = stageIdx; i < this._stages.length; ++i) {
    //   const currentMatch = this._stages[i].matches[currentMatchId];
    //
    //   if (i !== stageIdx) {
    //     if (currentMatch.players[0] && players.find(player => player.id === currentMatch.players[0].id)) {
    //       currentMatch.clear();
    //       delete currentMatch.players[0];
    //     } else if (currentMatch.players[1] && players.find(player => player.id === currentMatch.players[1].id)) {
    //       currentMatch.clear();
    //       delete currentMatch.players[1];
    //     }
    //   }
    //
    //   players.push(currentMatch.players[0] || new Player(), currentMatch.players[1] || new Player());
    //   currentMatchId = this.getNextMatchIdx(matchIdx);
    // }
  }

  findMatchByPlayer(playerId: string): Match {
    for (const stage of this.upGrid.stages) {
      for (const match of stage.matches) {
        if (match.players && match.players.some(player => player.id === playerId)) {
          return match;
        }
      }
    }

    for (const stage of this.downGrid.stages) {
      for (const match of stage.matches) {
        if (match.players && match.players.some(player => player.id === playerId)) {
          return match;
        }
      }
    }

    return undefined;
  }

  public getDiff<T extends Grid>(grid: T): DeepDiff {
    const currentJson = this.getJson();
    const gridJson = grid.getJson();

    return diff(currentJson, gridJson);
  }

  public getJson(): object {
    return classToPlain(this);
  }

  getMatch(matchId: string): Match {
    const match = this.getUpGridMatch(matchId);
    if (match) { return match; }

    return this.getMatchDownGrid(matchId);
  }

  getWinners(): Player[] {
    const winners = [];

    const upStages = this.upGrid.stages;
    const downStages = this.downGrid.stages;
    winners.push(upStages[upStages.length - 1].matches[0].winner);

    if (this.config.prizePlaces >= 2) {
      winners.push(upStages[upStages.length - 1].matches[0].loser);
    }

    if (this.config.prizePlaces >= 3) {
      winners.push(downStages[downStages.length - 1].matches[0].winner);
    }

    if (this.config.prizePlaces === 4) {
      winners.push(downStages[downStages.length - 1].matches[0].loser);
    }

    return winners;
  }

  setScoreAndMovePlayers(match: Match, ...scorePlayers: number[]): void {
    if (this.getUpGridMatch(match._id)) {
      return this.winUpGridPlayer(match, ...scorePlayers);
    }

    if (this.getMatchDownGrid(match._id)) {
      return this.winDownGridPlayer(match, ...scorePlayers);
    }
  }

  setPlayers(winners: IPlayer[]): void {
    for (let i = 0; i < winners.length; ++i) {
      const winner = winners[i];
      const matchIdx = Math.floor(i / 2);

      if (i % 2 === 0) {
        this.upGrid.stages[0].matches[matchIdx].players[0] = winner;
      } else {
        this.upGrid.stages[0].matches[matchIdx].players[1] = winner;
      }
    }
  }

  private addSuperFinal() {
    const stage = new Stage();
    stage.matches.push(new Match());
    this.upGrid.stages.push(stage);
  }

  private getUpGridMatch(matchId: string): null | Match {
    for (const stage of this.upGrid.stages) {
      for (const match of stage.matches) {
        if (match._id === matchId) {
          return match;
        }
      }
    }

    return null;
  }

  private getMatchDownGrid(matchId: string): null | Match {
    for (const stage of this.downGrid.stages) {
      for (const match of stage.matches) {
        if (match._id === matchId) {
          return match;
        }
      }
    }

    return null;
  }

  private winUpGridPlayer(match: Match, ...scorePlayers: number[]): void {
    this.upGrid.setScoreAndMovePlayers(match, ...scorePlayers);
    if (!match.closed) { return; }
    const [stageIdx, matchIdx] = this.getStageAndMatchIdx(match, this.upGrid.stages);

    let downStageIdx = stageIdx * 2 - 1;
    let downMatchIdx = matchIdx;
    if (stageIdx === 0) {
      downStageIdx = 0;
      downMatchIdx = Math.floor(matchIdx / 2);
    }

    if (stageIdx % 2 === 1) {
      downMatchIdx = this.downGrid.stages[downStageIdx].matches.length - downMatchIdx - 1;
    }

    const downMatch = this.downGrid.stages[downStageIdx].matches[downMatchIdx];
    if (matchIdx % 2 === 0 || stageIdx !== 0) {
      downMatch.players[0] = match.loser;
    } else {
      downMatch.players[1] = match.loser;
    }

    this.checkDownEmptyMatch(downMatch);
  }

  private getStageAndMatchIdx(match: Match, stages: Stage[]) {
    const stageIdx = stages.findIndex(stage => !!stage.matches.find(m => m._id === match._id));
    const matchIdx = stages[stageIdx].matches.findIndex(m => m._id === match._id);

    return [stageIdx, matchIdx];
  }

  private checkDownEmptyMatch(match: Match) {
    if (match.players[0] && match.players[0].id === EMPTY_PLAYER.id && match.players[1] && match.players[1].id !== EMPTY_PLAYER.id) {
      return this.winDownGridPlayer(match, 0, match.bo);
    }

    if (match.players[1] && match.players[1].id === EMPTY_PLAYER.id && match.players[0] && match.players[0].id !== EMPTY_PLAYER.id) {
      return this.winDownGridPlayer(match, match.bo, 0);
    }
  }

  private winDownGridPlayer(match: Match, ...scorePlayers: number[]): void {
    match.setScore(scorePlayers[0], scorePlayers[1]);
    if (!match.closed) { return; }
    const [stageIdx, matchIdx] = this.getStageAndMatchIdx(match, this.downGrid.stages);

    const nextStage = this.downGrid.stages[stageIdx + 1];
    if (!nextStage) {
      this.upGrid.stages[this.upGrid.stages.length - 1].matches[0].players[1] = match.winner;
      return;
    }

    if (stageIdx % 2 === 0) {
      nextStage.matches[matchIdx].players[1] = match.winner;
    } else {
      const nextMatchIdx = Math.floor(matchIdx / 2);
      if (matchIdx % 2 === 0) {
        nextStage.matches[nextMatchIdx].players[0] = match.winner;
      } else {
        nextStage.matches[nextMatchIdx].players[1] = match.winner;
      }
    }

    return;
  }
}