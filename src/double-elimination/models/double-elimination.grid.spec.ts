// import {DoubleEliminationGrid} from './double-elimination.grid';
// import {Stage} from '../../single-elimination/models/stage';
// import {EMPTY_PLAYER, Match} from '../../single-elimination/models/match';
// import {DoubleDownGrid} from './double-down.grid';
// import {SingleEliminationGrid} from '../../single-elimination/models/single-elimination.grid';
//
// describe('DoubleElimination Grid', () => {
//   let grid: DoubleEliminationGrid;
//   beforeEach(() => {
//     grid = new DoubleEliminationGrid();
//     grid.downGrid = new DoubleDownGrid();
//     grid.upGrid = new SingleEliminationGrid();
//     grid.downGrid._stages = [new Stage(), new Stage(), new Stage(), new Stage()];
//     grid.downGrid._stages[0].matches = [ new Match(), new Match() ];
//     grid.downGrid._stages[1].matches = [ new Match(), new Match() ];
//     grid.downGrid._stages[2].matches = [ new Match() ];
//     grid.downGrid._stages[3].matches = [ new Match() ];
//
//     grid.downGrid._stages[0].matches[0].player1 = '1';
//     grid.downGrid._stages[0].matches[0].player2 = '2';
//     grid.downGrid._stages[0].matches[1].player1 = '3';
//     grid.downGrid._stages[0].matches[1].player2 = '4';
//
//     grid.downGrid._stages[1].matches[0].player1 = '5';
//     grid.downGrid._stages[1].matches[1].player1 = '7';
//
//     grid.downGrid._stages[2].matches[0].player1 = '9';
//     grid.downGrid._stages[3].matches[0].player1 = '11';
//
//     grid.upGrid._stages = [new Stage(), new Stage(), new Stage(), new Stage()];
//     grid.upGrid._stages[3].matches = [new Match()];
//   });
//
//   describe('should be winDownGridPlayer', () => {
//     it('odd stageId', () => {
//       grid.winDownGridPlayer(0, 0, '2', 1);
//       expect(grid.downGrid._stages[1].matches[0].player2).toBe('2');
//     });
//
//     it('even stageId', () => {
//       grid.downGrid._stages[1].matches[0].player2 = '2';
//       grid.downGrid._stages[1].matches[1].player2 = '3';
//       grid.winDownGridPlayer(1, 0, '2', 1);
//       grid.winDownGridPlayer(1, 1, '3', 1);
//
//       expect(grid.downGrid._stages[2].matches[0].player1).toBe('2');
//       expect(grid.downGrid._stages[2].matches[0].player2).toBe('3');
//     });
//
//     it('superfinal', () => {
//       grid.downGrid._stages[3].matches[0].player2 = '1';
//       grid.winDownGridPlayer(3, 0, '1', 1);
//
//       expect(grid.upGrid._stages[3].matches[0].player2).toBe('1');
//     });
//   });
//
//   describe('should be checkDownEmptyMatch', () => {
//     it('empty start stage', () => {
//       grid.downGrid._stages[0].matches[0].player2 = EMPTY_PLAYER;
//       grid.downGrid._stages[0].matches[1].player1 = EMPTY_PLAYER;
//       grid.checkDownEmptyMatch(0, 0);
//       grid.checkDownEmptyMatch(0, 1);
//
//       expect(grid.downGrid._stages[1].matches[0].player2).toBe(grid.downGrid._stages[0].matches[0].player1);
//       expect(grid.downGrid._stages[1].matches[1].player2).toBe(grid.downGrid._stages[0].matches[1].player2);
//     });
//   });
//
//   describe('should be winUpGridPlayer', () => {
//     beforeEach(() => {
//       grid = new DoubleEliminationGrid();
//       grid.upGrid = new SingleEliminationGrid();
//       grid.downGrid = new DoubleDownGrid();
//       grid.downGrid._stages = [new Stage(), new Stage(), new Stage(), new Stage()];
//       grid.downGrid._stages[0].matches = [new Match(), new Match()];
//
//       grid.upGrid._stages = [new Stage(), new Stage(), new Stage()];
//       grid.upGrid._stages[0].matches = [new Match(), new Match(), new Match(), new Match()];
//       grid.upGrid._stages[1].matches = [new Match(), new Match()];
//       grid.upGrid._stages[2].matches = [new Match()];
//       grid.upGrid._stages[0].matches[0].player1 = '1';
//       grid.upGrid._stages[0].matches[0].player2 = '2';
//       grid.upGrid._stages[0].matches[1].player1 = '3';
//       grid.upGrid._stages[0].matches[1].player2 = '4';
//       grid.upGrid._stages[0].matches[2].player1 = '5';
//       grid.upGrid._stages[0].matches[2].player2 = '6';
//       grid.upGrid._stages[0].matches[3].player1 = '7';
//       grid.upGrid._stages[0].matches[3].player2 = '8';
//
//     });
//
//     it('even match stageId 0', () => {
//       grid.winUpGridPlayer(0, 0, '1', 1);
//
//       expect(grid.upGrid._stages[1].matches[0].player1).toBe('1');
//       expect(grid.downGrid._stages[0].matches[0].player1).toBe('2');
//     });
//
//     it('odd match stageId 0', () => {
//       grid.winUpGridPlayer(0, 1, '3', 1);
//
//       expect(grid.upGrid._stages[1].matches[0].player2).toBe('3');
//       expect(grid.downGrid._stages[0].matches[0].player2).toBe('4');
//     });
//
//     it('even match stageId 1', () => {
//       grid.upGrid._stages[1].matches[0].player1 = '1';
//       grid.upGrid._stages[1].matches[0].player2 = '3';
//       grid.winUpGridPlayer(1, 0, '3', 1);
//
//       expect(grid.upGrid._stages[2].matches[0].player1).toBe('3');
//       expect(grid.downGrid._stages[3].matches[0].player1).toBe('4');
//     });
//   });
//
// });
