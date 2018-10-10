import * as _ from 'lodash';
import {DoubleEliminationGrid} from './models/double-elimination.grid';

export class DoubleEliminationController {
  public generateGrid(players: string[]): DoubleEliminationGrid {
    const grid = DoubleEliminationGrid.generateGrid(players);

    console.log(grid.upGrid.stages);
    console.log('------------------------------------------------------------------------------------------------------------------');
    console.log(grid.downGrid.stages);
    console.log('------------------------------------------------------------------------------------------------------------------');

    return grid;
  }

}