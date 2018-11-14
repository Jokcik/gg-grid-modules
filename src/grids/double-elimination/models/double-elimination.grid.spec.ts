// import {DoubleEliminationGrid} from './double-elimination.grid';
// import {Stage} from '../../single-elimination/models/stage';
// import {EMPTY_PLAYER, Match} from '../../single-elimination/models/match';
// import {DoubleDownGrid} from './double-down.grid';
// import {SingleEliminationGrid} from '../../single-elimination/models/single-elimination.grid';
//
import {DoubleEliminationGrid} from './double-elimination.grid';
import {DoubleDownGrid} from './double-down.grid';
import {SingleEliminationGrid} from '../../single-elimination/models/single-elimination.grid';
import * as _ from 'lodash';
import {IGridConfig} from '../../../interfaces';
import {EMPTY_PLAYER, Player} from '../../../models';

describe('DoubleElimination Grid', () => {
  let config: IGridConfig;
  // let grid: DoubleEliminationGrid;
  let bo;

  let players2: Player[];
  let players4: Player[];
  let players8: Player[];
  let players16: Player[];

  beforeEach(() => {
    config = { prizePlaces: 3 };
    (_ as any).shuffle = collections => collections;
    bo = 1;

    players2 = Array(2).fill(EMPTY_PLAYER);
    players2[0] = new Player('1');
    players2[1] = new Player('2');

    players4 = Array(4).fill(EMPTY_PLAYER);
    players4[0] = new Player('1');
    players4[1] = new Player('2');
    players4[3] = new Player('4');

    players8 = Array(8).fill(EMPTY_PLAYER);
    players8[0] = new Player('1');
    players8[1] = new Player('2');
    players8[2] = new Player('3');
    players8[3] = new Player('4');
    players8[4] = new Player('5');
    players8[5] = new Player('6');
    players8[6] = new Player('7');
    players8[7] = new Player('8');

    players16 = Array(16).fill(EMPTY_PLAYER);
    players16[0] = new Player('1');
    players16[1] = new Player('2');
    players16[2] = new Player('3');
    players16[3] = new Player('4');
    players16[4] = new Player('5');
    players16[5] = new Player('6');
    players16[6] = new Player('7');
    players16[7] = new Player('8');
    players16[8] = new Player('9');
  });

  describe('should be winDownGridPlayer', () => {
    it('odd stageId', () => {
      const grid = new DoubleEliminationGrid(players8, config);
      grid.setScoreAndMovePlayers(grid.upGrid.stages[0].matches[0], 0, bo);
      expect(grid.upGrid.stages[1].matches[0].players[0].id).toBe(players8[3].id);
    });

    it('even stageId', () => {
      const grid = new DoubleEliminationGrid(players8, config);
      grid.downGrid.stages[1].matches[0].players[1] = players8[1];
      grid.downGrid.stages[1].matches[1].players[1] = players8[2];
      grid.setScoreAndMovePlayers(grid.downGrid.stages[1].matches[0], 0, bo);
      grid.setScoreAndMovePlayers(grid.downGrid.stages[1].matches[1], 0, bo);

      players8 = players8.slice();
      expect(grid.downGrid.stages[2].matches[0].players[0].id).toBe(players8[1].id);
      expect(grid.downGrid.stages[2].matches[0].players[1].id).toBe(players8[2].id);
    });

    it('superfinal', () => {
      const grid = new DoubleEliminationGrid(players8, config);
      grid.downGrid.stages[3].matches[0].players[1] = players8[0];
      grid.setScoreAndMovePlayers(grid.downGrid.stages[3].matches[0], 0, bo);

      players8 = players8.slice();
      expect(grid.upGrid.stages[3].matches[0].players[1].id).toBe(players8[0].id);
    });
  });

  describe('should be checkDownEmptyMatch', () => {
    it('empty start stage', () => {
      const grid = new DoubleEliminationGrid(players8, config);
      grid.downGrid.stages[0].matches[0].players[1] = EMPTY_PLAYER;
      grid.downGrid.stages[0].matches[1].players[1] = EMPTY_PLAYER;

      (grid as any).checkDownEmptyMatch(grid.downGrid.stages[0].matches[0]);
      (grid as any).checkDownEmptyMatch(grid.downGrid.stages[0].matches[1]);

      expect(grid.downGrid.stages[1].matches[0].players[0]).toBe(grid.downGrid.stages[0].matches[0].players[0]);
      expect(grid.downGrid.stages[1].matches[0].players[1]).toBe(grid.downGrid.stages[0].matches[1].players[0]);
    });
  });

  describe('should be winUpGridPlayer', () => {
    it('even match stageId 0', () => {
      const grid = new DoubleEliminationGrid(players8, config);
      grid.setScoreAndMovePlayers(grid.upGrid.stages[0].matches[0], bo, 0);

      expect(grid.upGrid.stages[1].matches[0].players[0].id).toBe(players8[7].id);
      expect(grid.downGrid.stages[0].matches[0].players[0].id).toBe(players8[3].id);
    });

    it('odd match stageId 0', () => {
      const grid = new DoubleEliminationGrid(players8, config);
      grid.setScoreAndMovePlayers(grid.upGrid.stages[0].matches[0], bo, 0);
      grid.setScoreAndMovePlayers(grid.upGrid.stages[0].matches[1], 0, bo);
      grid.setScoreAndMovePlayers(grid.upGrid.stages[1].matches[0], 0, bo);

      expect(grid.upGrid.stages[2].matches[0].players[0]).toBe(grid.upGrid.stages[0].matches[1].players[1]);
      expect(grid.downGrid.stages[1].matches[1].players[0]).toBe(grid.upGrid.stages[0].matches[0].players[0]);
    });
  });

  describe('should be checkDownEmptyMatch', () => {
    it('empty start stage', () => {
      const grid = new DoubleEliminationGrid(players8, config);
      grid.downGrid.stages[0].matches[0].players[1] = EMPTY_PLAYER;
      grid.downGrid.stages[0].matches[1].players[1] = EMPTY_PLAYER;

      (grid as any).checkDownEmptyMatch(grid.downGrid.stages[0].matches[0]);
      (grid as any).checkDownEmptyMatch(grid.downGrid.stages[0].matches[1]);

      expect(grid.downGrid.stages[1].matches[0].players[0]).toBe(grid.downGrid.stages[0].matches[0].players[0]);
      expect(grid.downGrid.stages[1].matches[0].players[1]).toBe(grid.downGrid.stages[0].matches[1].players[0]);
    });
  });
});
