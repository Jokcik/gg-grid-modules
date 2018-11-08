import {IGridConfig} from '../interfaces';
import {Grid} from '../interfaces';
import {IPlayer} from '../interfaces';
import {GridTypesEnum} from './grid-types.enum';
import {SingleEliminationGrid} from '../grids/single-elimination/models/single-elimination.grid';
import {Match} from '../models';

export class GridManager {
  public _grids: Grid[];

  constructor(private configs: IGridConfig[]) {
  }

  public restoreGrids(grids: object[]) {
  }

  public setScoreAndMovePlayers(grid: Grid, match: Match, ...scores) {
    grid.setScoreAndMovePlayers(match, ...scores);

    const gridIndex = this._grids.findIndex(g => g._id === grid._id);
    if (!this._grids[gridIndex + 1]) { return; }

    const winners = grid.getWinners();
    const nextGrid = this._grids[gridIndex + 1];

    nextGrid.setWinnersPrevGrid(winners);
  }

  public generateGrids(players: IPlayer[]) {
    let nextPlayers = players;
    this._grids = [];

    for (let i = 0; i < this.configs.length; ++i) {
      const config = this.configs[i];
      this._grids[i] = this.generateGrid(nextPlayers, config);

      nextPlayers = Array(config.playersNextGrid);
    }

    return this._grids;
  }

  private generateGrid(players: IPlayer[], config: IGridConfig): Grid {
    switch (config.type) {
      case GridTypesEnum.SINGLE_ELIMINATION:
        return new SingleEliminationGrid(players, config);
      default:
        break;
    }

    return null;
  }
}