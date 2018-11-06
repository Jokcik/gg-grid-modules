// import {DoubleDownGrid} from './double-down.grid';
//
// describe('DoubleDown Grid', () => {
//   beforeAll(() => {
//   });
//
//   describe('should be generateStages', () => {
//     it('stagesInSingle 2', () => {
//       const grid = new DoubleDownGrid();
//       const _stages = grid.generateStages(2);
//
//       expect(_stages[0].matches.length).toBe(1);
//       expect(_stages[1].matches.length).toBe(1);
//     });
//
//     it('stagesInSingle 4', () => {
//       const grid = new DoubleDownGrid();
//       const _stages = grid.generateStages(4);
//
//       expect(_stages[0].matches.length).toBe(4);
//       expect(_stages[1].matches.length).toBe(4);
//       expect(_stages[2].matches.length).toBe(2);
//       expect(_stages[3].matches.length).toBe(2);
//       expect(_stages[4].matches.length).toBe(1);
//       expect(_stages[5].matches.length).toBe(1);
//     });
//
//     it('stagesInSingle 8', () => {
//       const grid = new DoubleDownGrid();
//       const _stages = grid.generateStages(8);
//
//       expect(_stages[0].matches.length).toBe(64);
//       expect(_stages[5].matches.length).toBe(16);
//       expect(_stages[10].matches.length).toBe(2);
//       expect(_stages[13].matches.length).toBe(1);
//     });
//   });
//
//   describe('should be generateGrid', () => {
//     const grid = DoubleDownGrid.generateGrid(['1', '2', '3', '4', '5', '6']);
//
//     expect(grid._stages.length).toBe(4);
//     expect(grid._stages[0].matches.length).toBe(2);
//     expect(grid._stages[2].matches.length).toBe(1);
//   });
// });
