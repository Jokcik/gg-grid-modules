import {DoubleDownGrid} from './double-down.grid';

describe('DoubleDown Grid', () => {
  beforeAll(() => {
  });

  describe('should be generateStages', () => {
    it('stagesInSingle 2', () => {
      const grid = new DoubleDownGrid();
      const stages = grid.generateStages(2);

      expect(stages[0].matches.length).toBe(1);
      expect(stages[1].matches.length).toBe(1);
    });

    it('stagesInSingle 4', () => {
      const grid = new DoubleDownGrid();
      const stages = grid.generateStages(4);

      expect(stages[0].matches.length).toBe(4);
      expect(stages[1].matches.length).toBe(4);
      expect(stages[2].matches.length).toBe(2);
      expect(stages[3].matches.length).toBe(2);
      expect(stages[4].matches.length).toBe(1);
      expect(stages[5].matches.length).toBe(1);
    });

    it('stagesInSingle 8', () => {
      const grid = new DoubleDownGrid();
      const stages = grid.generateStages(8);

      expect(stages[0].matches.length).toBe(64);
      expect(stages[5].matches.length).toBe(16);
      expect(stages[10].matches.length).toBe(2);
      expect(stages[13].matches.length).toBe(1);
    });
  });

  describe('should be generateGrid', () => {
    const grid = DoubleDownGrid.generateGrid(['1', '2', '3', '4', '5', '6']);

    expect(grid.stages.length).toBe(4);
    expect(grid.stages[0].matches.length).toBe(2);
    expect(grid.stages[2].matches.length).toBe(1);
  });
});
