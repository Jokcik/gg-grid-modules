import {DoubleEliminationGrid} from './double-elimination.grid';
import {Stage} from '../../single-elimination/models/stage';
import {EMPTY_PLAYER, Match} from '../../single-elimination/models/match';
import {DoubleDownGrid} from './double-down.grid';
import {SingleEliminationGrid} from '../../single-elimination/models/single-elimination.grid';

describe('DoubleElimination Grid', () => {
  let grid: DoubleEliminationGrid;
  beforeEach(() => {
    grid = new DoubleEliminationGrid();
    grid.downGrid = new DoubleDownGrid();
    grid.upGrid = new SingleEliminationGrid();
    grid.downGrid.stages = [new Stage(), new Stage(), new Stage(), new Stage()];
    grid.downGrid.stages[0].matches = [ new Match(), new Match() ];
    grid.downGrid.stages[1].matches = [ new Match(), new Match() ];
    grid.downGrid.stages[2].matches = [ new Match() ];
    grid.downGrid.stages[3].matches = [ new Match() ];

    grid.downGrid.stages[0].matches[0].player1 = '1';
    grid.downGrid.stages[0].matches[0].player2 = '2';
    grid.downGrid.stages[0].matches[1].player1 = '3';
    grid.downGrid.stages[0].matches[1].player2 = '4';

    grid.downGrid.stages[1].matches[0].player1 = '5';
    grid.downGrid.stages[1].matches[1].player1 = '7';

    grid.downGrid.stages[2].matches[0].player1 = '9';
    grid.downGrid.stages[3].matches[0].player1 = '11';

    grid.upGrid.stages = [new Stage(), new Stage(), new Stage(), new Stage()];
    grid.upGrid.stages[3].matches = [new Match()];
  });

  describe('should be winDownGridPlayer', () => {
    it('odd stageId', () => {
      grid.winDownGridPlayer(0, 0, '2', 1);
      expect(grid.downGrid.stages[1].matches[0].player2).toBe('2');
    });

    it('even stageId', () => {
      grid.downGrid.stages[1].matches[0].player2 = '2';
      grid.downGrid.stages[1].matches[1].player2 = '3';
      grid.winDownGridPlayer(1, 0, '2', 1);
      grid.winDownGridPlayer(1, 1, '3', 1);

      expect(grid.downGrid.stages[2].matches[0].player1).toBe('2');
      expect(grid.downGrid.stages[2].matches[0].player2).toBe('3');
    });

    it('superfinal', () => {
      grid.downGrid.stages[3].matches[0].player2 = '1';
      grid.winDownGridPlayer(3, 0, '1', 1);

      expect(grid.upGrid.stages[3].matches[0].player2).toBe('1');
    });
  });

  describe('should be checkDownEmptyMatch', () => {
    it('empty start stage', () => {
      grid.downGrid.stages[0].matches[0].player2 = EMPTY_PLAYER;
      grid.downGrid.stages[0].matches[1].player1 = EMPTY_PLAYER;
      grid.checkDownEmptyMatch(0, 0);
      grid.checkDownEmptyMatch(0, 1);

      expect(grid.downGrid.stages[1].matches[0].player2).toBe(grid.downGrid.stages[0].matches[0].player1);
      expect(grid.downGrid.stages[1].matches[1].player2).toBe(grid.downGrid.stages[0].matches[1].player2);
    });
  });

  // describe('should be winUpGridPlayer', () => {
  //   it('event start page', () => {
  //     grid.downGrid.stages[0].matches[0].player2 = EMPTY_PLAYER;
  //     grid.downGrid.stages[0].matches[1].player1 = EMPTY_PLAYER;
  //     grid.checkDownEmptyMatch(0, 0);
  //     grid.checkDownEmptyMatch(0, 1);
  //
  //     expect(grid.downGrid.stages[1].matches[0].player2).toBe(grid.downGrid.stages[0].matches[0].player1);
  //     expect(grid.downGrid.stages[1].matches[1].player2).toBe(grid.downGrid.stages[0].matches[1].player2);
  //   });
  // });

});
