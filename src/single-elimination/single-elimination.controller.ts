import {SingleEliminationGrid} from './models/single-elimination.grid';
import {Player} from '../models/player';
import {Grid} from '../interfaces/grid.interface';

export class SingleEliminationController {
  public generateGrid(players: Player[]): SingleEliminationGrid {
    const grid: SingleEliminationGrid = new SingleEliminationGrid(players, {});

    // grid.setScoreAndMovePlayers(grid.stages[0].matches[0], 1, 0);
    // grid.setScoreAndMovePlayers(grid.stages[0].matches[1], 1, 0);

    console.log(grid.stages[0].matches);
    console.log('------------------------------------------------------------------------------------------------------------------');
    console.log(grid.stages[1].matches);
    console.log('------------------------------------------------------------------------------------------------------------------');
    // console.log(grid.stages[2].matches);
    // console.log('------------------------------------------------------------------------------------------------------------------');

    return grid;
  }

}