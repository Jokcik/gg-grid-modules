// import {DoubleDownGrid} from './double-down.grid';
//
import {DoubleDownGrid} from './double-down.grid';
import {Player} from '../../../models';

describe('DoubleDown Grid', () => {
  beforeAll(() => {
  });

  describe('should be generateStages', () => {
    it('stagesInSingle 2', () => {
      const grid = new DoubleDownGrid();
      const _stages = grid.generateStages(2);

      expect(grid.stages[0].matches.length).toBe(1);
      expect(grid.stages[1].matches.length).toBe(1);
    });

    it('stagesInSingle 4', () => {
      const grid = new DoubleDownGrid();
      grid.generateStages(4);

      expect(grid.stages[0].matches.length).toBe(4);
      expect(grid.stages[1].matches.length).toBe(4);
      expect(grid.stages[2].matches.length).toBe(2);
      expect(grid.stages[3].matches.length).toBe(2);
      expect(grid.stages[4].matches.length).toBe(1);
      expect(grid.stages[5].matches.length).toBe(1);
    });

    it('stagesInSingle 8', () => {
      const grid = new DoubleDownGrid();
      grid.generateStages(8);

      expect(grid.stages[0].matches.length).toBe(64);
      expect(grid.stages[5].matches.length).toBe(16);
      expect(grid.stages[10].matches.length).toBe(2);
      expect(grid.stages[13].matches.length).toBe(1);
    });
  });

  describe('should be generateGrid', () => {
    it('generateGrid', () => {
      const grid = new DoubleDownGrid([new Player('1'), new Player('2'), new Player('3'), new Player('4'), new Player('5'), new Player('6')]);

      expect(grid.stages.length).toBe(4);
      expect(grid.stages[0].matches.length).toBe(2);
      expect(grid.stages[2].matches.length).toBe(1);
    });
  });
});
