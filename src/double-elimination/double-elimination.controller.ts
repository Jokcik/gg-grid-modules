// import * as _ from 'lodash';
// import {DoubleEliminationGrid} from './models/double-elimination.grid';
//
// export class DoubleEliminationController {
//   public generateGrid(players: string[]): DoubleEliminationGrid {
//     const grid = DoubleEliminationGrid.generateGrid(players);
//
//     // grid.winUpGridPlayer(0, 0, '16', 1);
//     grid.winUpGridPlayer(0, 1, '15', 1);
//     grid.winUpGridPlayer(0, 2, '6', 1);
//     grid.winUpGridPlayer(0, 3, '5', 1);
//     grid.winUpGridPlayer(0, 4, '12', 1);
//     grid.winUpGridPlayer(0, 5, '11', 1);
//     grid.winUpGridPlayer(0, 6, '2', 1);
//     grid.winUpGridPlayer(0, 7, '1', 1);
//
//     grid.winUpGridPlayer(1, 0, '16', 1);
//     grid.winUpGridPlayer(1, 1, '5', 1);
//     grid.winUpGridPlayer(1, 2, '11', 1);
//     grid.winUpGridPlayer(1, 3, '1', 1);
//
//     grid.winUpGridPlayer(2, 0, '5', 1);
//     grid.winUpGridPlayer(2, 1, '11', 1);
//
//     grid.winUpGridPlayer(3, 0, '5', 1);
//
//     // grid.winDownGridPlayer(0, 0, '7', 1);
//     grid.winDownGridPlayer(0, 1, '14', 1);
//     grid.winDownGridPlayer(0, 2, '4', 1);
//     grid.winDownGridPlayer(0, 3, '9', 1);
//
//     grid.winDownGridPlayer(1, 0, '2', 1);
//     grid.winDownGridPlayer(1, 1, '12', 1);
//     grid.winDownGridPlayer(1, 2, '6', 1);
//     grid.winDownGridPlayer(1, 3, '15', 1);
//
//     grid.winDownGridPlayer(2, 0, '12', 1);
//     grid.winDownGridPlayer(2, 1, '15', 1);
//
//     grid.winDownGridPlayer(3, 0, '12', 1);
//     grid.winDownGridPlayer(3, 1, '15', 1);
//
//     grid.winDownGridPlayer(4, 0, '15', 1);
//
//     grid.winDownGridPlayer(5, 0, '11', 1);
//
//     console.log(grid.upGrid._stages[0].matches);
//     console.log('0------------------------------------------------------------------------------------------------------------------');
//     console.log(grid.upGrid._stages[1].matches);
//     console.log('1------------------------------------------------------------------------------------------------------------------');
//     console.log(grid.upGrid._stages[2].matches);
//     console.log('2------------------------------------------------------------------------------------------------------------------');
//     console.log(grid.upGrid._stages[3].matches);
//     console.log('3------------------------------------------------------------------------------------------------------------------');
//     console.log(grid.upGrid._stages[4].matches);
//     console.log('4------------------------------------------------------------------------------------------------------------------');
//
//     console.log('=================================================================================================================');
//
//     console.log(grid.downGrid._stages[0].matches);
//     console.log('0------------------------------------------------------------------------------------------------------------------');
//     console.log(grid.downGrid._stages[1].matches);
//     console.log('1------------------------------------------------------------------------------------------------------------------');
//     console.log(grid.downGrid._stages[2].matches);
//     console.log('2------------------------------------------------------------------------------------------------------------------');
//     console.log(grid.downGrid._stages[3].matches);
//     console.log('3------------------------------------------------------------------------------------------------------------------');
//     console.log(grid.downGrid._stages[4].matches);
//     console.log('4------------------------------------------------------------------------------------------------------------------');
//     console.log(grid.downGrid._stages[5].matches);
//     console.log('5------------------------------------------------------------------------------------------------------------------');
//
//     return grid;
//   }
//
// }