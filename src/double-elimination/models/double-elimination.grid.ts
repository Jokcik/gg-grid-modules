import {DoubleDownGrid} from './double-down.grid';
import {SingleEliminationGrid} from '../../single-elimination/models/single-elimination.grid';

export class DoubleEliminationGrid {
  public upGrid: SingleEliminationGrid;
  public downGrid: DoubleDownGrid;

  public static generateGrid(players: string[]): DoubleEliminationGrid {
    const grid = new DoubleEliminationGrid();
    grid.upGrid = SingleEliminationGrid.generateGrid(players).addSuperFinal();
    grid.downGrid = DoubleDownGrid.generateGrid(players);

    return grid;
  }

  public winUpGridPlayer(stageId: number, matchId: number, playerId: string, score: number) {
    this.upGrid.winPlayerInMatch(stageId, matchId, playerId, score);
  }
}