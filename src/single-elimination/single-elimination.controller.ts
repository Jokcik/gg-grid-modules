import * as _ from 'lodash';
import {SingleEliminationGrid} from './models/single-elimination.grid';

export class SingleEliminationController {
  public generateGrid(players: string[]): SingleEliminationGrid {
    const grid = SingleEliminationGrid.generateGrid(players);

    console.log(grid.stages[0].matches);
    console.log('------------------------------------------------------------------------------------------------------------------');
    console.log(grid.stages[1].matches);
    console.log('------------------------------------------------------------------------------------------------------------------');
    console.log(grid.stages[2].matches);
    console.log('------------------------------------------------------------------------------------------------------------------');

    return grid;
  }

}