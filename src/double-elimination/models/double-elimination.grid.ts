import {DoubleDownGrid} from './double-down.grid';
import {SingleEliminationGrid} from '../../single-elimination/models/single-elimination.grid';
import {EMPTY_PLAYER} from '../../single-elimination/models/match';

export class DoubleEliminationGrid {
  public upGrid: SingleEliminationGrid;
  public downGrid: DoubleDownGrid;

  public static generateGrid(players: string[]): DoubleEliminationGrid {
    const grid = new DoubleEliminationGrid();
    grid.upGrid = SingleEliminationGrid.generateGrid(players).addSuperFinal();
    grid.downGrid = DoubleDownGrid.generateGrid(players);

    const startStage = grid.upGrid.stages[0];
    for (let i = 0; i < startStage.matches.length; ++i) {
      const match = startStage.matches[i];
      if (match.player2 === EMPTY_PLAYER) {
        grid.winUpGridPlayer(0, i, match.player1, match.bo);
      }
    }

    return grid;
  }

  public winUpGridPlayer(stageId: number, matchId: number, playerId: string, score: number) {
    const match = this.upGrid.winPlayerInMatch(stageId, matchId, playerId, score);
    if (!match.closed) { return match; }

    let downStageId = stageId * 2 - 1;
    let downMatchId = matchId;
    if (stageId === 0) {
      downStageId = 0;
      downMatchId = Math.floor(matchId / 2);
    }

    if (stageId % 2 === 1) {
      downMatchId = this.downGrid.stages[downStageId].matches.length - downMatchId - 1;
    }

    const downMatch = this.downGrid.stages[downStageId].matches[downMatchId];
    if (matchId % 2 === 0 || stageId !== 0) {
      downMatch.player1 = match.stat.loss;
    } else {
      downMatch.player2 = match.stat.loss;
    }

    this.checkDownEmptyMatch(downStageId, downMatchId);

    return match;
  }

  public checkDownEmptyMatch(stageId: number, matchId: number) {
    const match = this.downGrid.stages[stageId].matches[matchId];
    if (match.player1 === EMPTY_PLAYER && match.player2 && match.player2 !== EMPTY_PLAYER) {
      return this.winDownGridPlayer(stageId, matchId, match.player2, match.bo);
    }

    if (match.player2 === EMPTY_PLAYER && match.player1 && match.player1 !== EMPTY_PLAYER) {
      return this.winDownGridPlayer(stageId, matchId, match.player1, match.bo);
    }
  }

  public winDownGridPlayer(stageId: number, matchId: number, playerId: string, score: number) {
    const match = this.downGrid.stages[stageId].matches[matchId];
    if (match.player1 !== playerId && match.player2 !== playerId) { return match; }

    let closed: boolean = false;
    const isFirstPlayer = match.player1 === playerId;
    if (isFirstPlayer) {
      closed = match.winPlayer1(score);
    } else {
      closed = match.winPlayer2(score);
    }

    if (!closed) { return match; }

    const nextStage = this.downGrid.stages[stageId + 1];
    if (!nextStage) {
      this.upGrid.stages[this.upGrid.stages.length - 1].matches[0].player2 = match.stat.win;
      return match;
    }

    if (stageId % 2 === 0) {
      nextStage.matches[matchId].player2 = match.stat.win;
    } else {
      nextStage.playerNextStage(matchId, match.stat.win);
    }

    return match;
  }
}