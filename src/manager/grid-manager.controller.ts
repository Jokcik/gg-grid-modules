import {IGridConfig} from '../interfaces';
import {Grid} from '../interfaces';
import {IPlayer} from '../interfaces';
import {GridTypesEnum} from './grid-types.enum';
import {SingleEliminationGrid} from '../grids/single-elimination/models/single-elimination.grid';
import {Match} from '../models';
import {plainToClass} from 'class-transformer';

export class GridManager {
  private static _gridTypes: (typeof Grid)[] = [];
  public _grids: Grid[];

  constructor(private configs: IGridConfig[]) {
  }

  public restoreGridsFromJson(grids: object[]) {
    for (let i = 0; i < grids.length; ++i) {
      this._grids[i] = this.getGridFromJson(grids[i], this.configs[i].type);
    }
  }

  public toJsonGrids() {
    return this._grids.map(grid => grid.getJson());
  }

  public setScoreAndMovePlayers(grid: Grid, match: Match, ...scores) {
    grid.setScoreAndMovePlayers(match, ...scores);

    const gridIndex = this._grids.findIndex(g => g._id === grid._id);
    if (!this._grids[gridIndex + 1]) { return; }

    const winners = grid.getWinners();
    const nextGrid = this._grids[gridIndex + 1];

    nextGrid.setPlayers(winners);
  }

  public generateGrids(players: IPlayer[]) {
    let nextPlayers = players;
    this._grids = [];

    for (let i = 0; i < this.configs.length; ++i) {
      const config = this.configs[i];
      this._grids[i] = this.generateGrid(nextPlayers, config);

      nextPlayers = Array(config.outputPlayersCount);
    }

    return this._grids;
  }

  private getGridFromJson(grid: object, type: GridTypesEnum): any {
    const typeGrid = this.getGridClass(type);
    return plainToClass(typeGrid, grid);
  }

  private getGridClass(type: GridTypesEnum): any {
    for (const classType of GridManager._gridTypes) {
      if (classType.isType(type)) {
        return classType;
      }
    }

    throw new Error(`Нет зарегистрирован тип: ${type}`);
  }

  private generateGrid(players: IPlayer[], config: IGridConfig): Grid {
    const gridClass = this.getGridClass(config.type);
    return new gridClass(players, config);
  }

  static register(type: any) {
    this._gridTypes.push(type);
  }
}