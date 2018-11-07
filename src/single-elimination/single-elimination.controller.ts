import {SingleEliminationGrid} from './models/single-elimination.grid';
import {Player} from '../models/player';
import {Grid} from '../interfaces/grid.interface';

export class SingleEliminationController {
  public generateGrid(players: Player[]): SingleEliminationGrid {
    const grid: SingleEliminationGrid = new SingleEliminationGrid(players, { prizePlaces: 4 });

    console.log(grid.stages[0].matches);
    console.log('------------------------------------------------------------------------------------------------------------------');
    console.log(grid.stages[1].matches);
    console.log('------------------------------------------------------------------------------------------------------------------');
    console.log(grid.stages);
    console.log('------------------------------------------------------------------------------------------------------------------');

    return grid;
  }

}