import {SingleEliminationGrid} from './single-elimination.grid';
import {Stage} from './stage';
import * as _ from 'lodash';
import {EMPTY_PLAYER, Match} from './match';

describe('SingleElimination Grid', () => {
  beforeAll(() => {
    (_ as any).shuffle = collections => collections;
  });

  describe('should be generateStages', () => {
    it('countStages 1', () => {
      const grid = new SingleEliminationGrid();
      const stage = grid.generateStages(1);

      expect(stage.length).toBe(1);
      expect(stage[0].matches.length).toBe(1);
    });

    it('countStages 3', () => {
      const grid = new SingleEliminationGrid();
      const stage = grid.generateStages(3);

      expect(stage.length).toBe(3);
      expect(stage[0].matches.length).toBe(4);
      expect(stage[1].matches.length).toBe(2);
      expect(stage[2].matches.length).toBe(1);
    });

    it('countStages 7', () => {
      const grid = new SingleEliminationGrid();
      const stage = grid.generateStages(7);

      expect(stage.length).toBe(7);
      expect(stage[0].matches.length).toBe(64);
      expect(stage[2].matches.length).toBe(16);
      expect(stage[4].matches.length).toBe(4);
      expect(stage[6].matches.length).toBe(1);
    });
  });

  describe('should be winEmptyPlayers', () => {
    it('stageId 0', () => {
      const grid = new SingleEliminationGrid();
      grid.stages = [new Stage(), new Stage(), new Stage()];
      grid.stages[0].matches = [new Match(), new Match(), new Match()];
      grid.stages[1].matches = [new Match(), new Match()];
      grid.stages[2].matches = [new Match()];

      grid.stages[0].matches[0].player1 = '1';
      grid.stages[0].matches[0].player2 = EMPTY_PLAYER;
      grid.stages[0].matches[1].player1 = '2';
      grid.stages[0].matches[1].player2 = '3';
      grid.stages[0].matches[2].player1 = '5';
      grid.stages[0].matches[2].player2 = EMPTY_PLAYER;

      grid.winEmptyPlayers(0);

      expect(grid.stages[1].matches[0].player1).toBe('1');
      expect(grid.stages[1].matches[0].player2).not.toBeDefined();
      expect(grid.stages[1].matches[1].player1).toBe('5');
      expect(grid.stages[1].matches[1].player2).not.toBeDefined();
    });
  });

  describe('should be cancelResultMatch', () => {
    it('cancel start match', () => {
      const grid = new SingleEliminationGrid();
      grid.stages = [new Stage(), new Stage(), new Stage()];
      grid.stages[0].matches = [new Match(), new Match(), new Match(), new Match()];
      grid.stages[1].matches = [new Match(), new Match()];
      grid.stages[2].matches = [new Match()];

      grid.stages[0].matches[0].player1 = '1';
      grid.stages[0].matches[0].player2 = '2';
      grid.stages[0].matches[1].player1 = '3';
      grid.stages[0].matches[1].player2 = '4';
      grid.stages[0].matches[2].player1 = '5';
      grid.stages[0].matches[2].player2 = '6';
      grid.stages[0].matches[3].player1 = '7';
      grid.stages[0].matches[3].player2 = '8';

      grid.stages[1].matches[0].player1 = '1';
      grid.stages[1].matches[0].player2 = '3';
      grid.stages[1].matches[1].player1 = '5';
      grid.stages[1].matches[1].player2 = '7';

      grid.stages[2].matches[0].player1 = '1';
      grid.stages[2].matches[0].player2 = '5';

      grid.cancelResultMatch(0, 1);

      expect(grid.stages[1].matches[0].player1).toBeDefined();
      expect(grid.stages[1].matches[0].player2).not.toBeDefined();
      expect(grid.stages[2].matches[0].player1).not.toBeDefined();
      expect(grid.stages[2].matches[0].player2).toBeDefined();
    });
  });

  describe('should be other', () => {
    it('add Third', () => {
      const grid = new SingleEliminationGrid();
      grid.stages = [new Stage(), new Stage()];
      grid.stages[0].matches = [new Match(), new Match()];
      grid.stages[1].matches = [new Match()];

      grid.addThird();

      expect(grid.stages[1].matches[1]).toBeDefined();
      expect(grid.stages[1].matches[1].isThird).toBe(true);
    });

    it('add SuperFinal', () => {
      const grid = new SingleEliminationGrid();
      grid.stages = [new Stage(), new Stage()];
      grid.stages[0].matches = [new Match(), new Match()];
      grid.stages[1].matches = [new Match()];

      grid.addSuperFinal();

      expect(grid.stages[2].matches[0]).toBeDefined();
      expect(grid.stages[2].matches[0].isThird).not.toBeTruthy();
    });
  });

  describe('should be winPlayerInMatch', () => {
    it('currect match win', () => {
      const grid = new SingleEliminationGrid();
      grid.stages = [new Stage(), new Stage(), new Stage()];
      grid.stages[0].matches = [new Match(), new Match(), new Match(), new Match()];
      grid.stages[1].matches = [new Match(), new Match()];
      grid.stages[2].matches = [new Match()];

      grid.stages[0].matches[0].player1 = '1';
      grid.stages[0].matches[0].player2 = '2';

      grid.stages[0].matches[1].player1 = '3';
      grid.stages[0].matches[1].player2 = '4';

      grid.winPlayerInMatch(0, 0, '1', 1);
      grid.winPlayerInMatch(0, 1, '4', 1);

      expect(grid.stages[0].matches[0].closed).toBe(true);
      expect(grid.stages[1].matches[0].player1).toBe('1');
      expect(grid.stages[1].matches[0].player2).toBe('4');
    });

    it('incurrect match win', () => {
      const grid = new SingleEliminationGrid();
      grid.stages = [new Stage(), new Stage(), new Stage()];
      grid.stages[0].matches = [new Match(), new Match(), new Match(), new Match()];
      grid.stages[1].matches = [new Match(), new Match()];
      grid.stages[2].matches = [new Match()];

      grid.stages[0].matches[0].player1 = '1';

      grid.winPlayerInMatch(0, 0, '1', 1);

      expect(grid.stages[0].matches[0].closed).not.toBeTruthy();
      expect(grid.stages[1].matches[0].player1).not.toBeDefined();
    });

    it('match win with third place', () => {
      const third = new Match();
      third.isThird = true;

      const grid = new SingleEliminationGrid();
      grid.stages = [new Stage(), new Stage()];
      grid.stages[0].matches = [new Match(), new Match()];
      grid.stages[1].matches = [new Match(), third];

      grid.stages[0].matches[0].player1 = '1';
      grid.stages[0].matches[0].player2 = '2';
      grid.stages[0].matches[1].player1 = '3';
      grid.stages[0].matches[1].player2 = '4';

      grid.winPlayerInMatch(0, 0, '1', 1);
      grid.winPlayerInMatch(0, 1, '3', 1);

      expect(grid.stages[1].matches[0].player1).toBe('1');
      expect(grid.stages[1].matches[0].player2).toBe('3');
      expect(grid.stages[1].matches[1].player1).toBe('2');
      expect(grid.stages[1].matches[1].player2).toBe('4');
    });
  });

  describe('should be initFirstStage', () => {
    it('3 players', () => {
      const grid = new SingleEliminationGrid();
      grid.stages = [new Stage(), new Stage()];
      grid.stages[0].matches = [new Match(), new Match()];
      grid.stages[1].matches = [new Match()];

      const stages = grid.initFirstStage(['1', '2', '3']);
      expect(stages[0].matches[0].player1).toBe('3');
      expect(stages[0].matches[0].player2).toBe(EMPTY_PLAYER);
      expect(stages[0].matches[1].player1).toBe('2');
      expect(stages[0].matches[1].player2).toBe('1');
    });

    it('6 players', () => {
      const grid = new SingleEliminationGrid();
      grid.stages = [new Stage(), new Stage(), new Stage()];
      grid.stages[0].matches = [new Match(), new Match(), new Match(), new Match()];
      grid.stages[1].matches = [new Match(), new Match()];
      grid.stages[2].matches = [new Match()];

      const stages = grid.initFirstStage(['1', '2', '3', '4', '5', '6']);
      expect(stages[0].matches[0].player1).toBe('6');
      expect(stages[0].matches[0].player2).toBe(EMPTY_PLAYER);
      expect(stages[0].matches[1].player1).toBe('5');
      expect(stages[0].matches[1].player2).toBe(EMPTY_PLAYER);
      expect(stages[0].matches[2].player1).toBe('4');
      expect(stages[0].matches[2].player2).toBe('2');
      expect(stages[0].matches[3].player1).toBe('3');
      expect(stages[0].matches[3].player2).toBe('1');
    });
  });

  describe('should be generateGrid players', () => {
    it('players 1', () => {
      const grid = SingleEliminationGrid.generateGrid(['1']);

      expect(grid.stages[0].matches[0]).toBeDefined();
      expect(grid.stages[0].matches[1]).not.toBeDefined();
      expect(grid.stages[1]).not.toBeDefined();
    });

    it('players 2', () => {
      const grid = SingleEliminationGrid.generateGrid(['1', '2']);

      expect(grid.stages[0].matches[0]).toBeDefined();
      expect(grid.stages[0].matches[1]).not.toBeDefined();
      expect(grid.stages[1]).not.toBeDefined();
    });

    it('players 3', () => {
      const grid = SingleEliminationGrid.generateGrid(['1', '2', '3']);

      const closed = grid.stages[0].matches[0].closed || grid.stages[0].matches[1].closed;
      expect(grid.stages[0].matches[0]).toBeDefined();
      expect(grid.stages[0].matches[1]).toBeDefined();
      expect(grid.stages[1].matches[0]).toBeDefined();
      expect(grid.stages[1].matches[1]).not.toBeDefined();
      expect(grid.stages[2]).not.toBeDefined();
      expect(closed).toBe(true);
    });

    it('players 4', () => {
      const grid = SingleEliminationGrid.generateGrid(['1', '2', '3', '4']);

      expect(grid.stages[0].matches[0]).toBeDefined();
      expect(grid.stages[0].matches[1]).toBeDefined();
      expect(grid.stages[1].matches[0]).toBeDefined();
      expect(grid.stages[1].matches[1]).not.toBeDefined();
      expect(grid.stages[2]).not.toBeDefined();
    });

    it('players 5', () => {
      const grid = SingleEliminationGrid.generateGrid(['1', '2', '3', '4', '5']);

      expect(grid.stages[0].matches[0]).toBeDefined();
      expect(grid.stages[0].matches[1]).toBeDefined();
      expect(grid.stages[0].matches[2]).toBeDefined();
      expect(grid.stages[0].matches[3]).toBeDefined();
      expect(grid.stages[1].matches[0]).toBeDefined();
      expect(grid.stages[1].matches[1]).toBeDefined();
      expect(grid.stages[2].matches[0]).toBeDefined();
      expect(grid.stages[2].matches[1]).not.toBeDefined();
      expect(grid.stages[3]).not.toBeDefined();
    });

    it('players 8', () => {
      const grid = SingleEliminationGrid.generateGrid(['1', '2', '3', '4', '5', '6', '7', '8']);

      expect(grid.stages[0].matches[0]).toBeDefined();
      expect(grid.stages[0].matches[1]).toBeDefined();
      expect(grid.stages[0].matches[2]).toBeDefined();
      expect(grid.stages[0].matches[3]).toBeDefined();
      expect(grid.stages[1].matches[0]).toBeDefined();
      expect(grid.stages[1].matches[1]).toBeDefined();
      expect(grid.stages[2].matches[0]).toBeDefined();
      expect(grid.stages[2].matches[1]).not.toBeDefined();
      expect(grid.stages[3]).not.toBeDefined();
    });

    it('players 9', () => {
      const grid = SingleEliminationGrid.generateGrid(['1', '2', '3', '4', '5', '6', '7', '8', '9']);

      expect(grid.stages[0].matches[0]).toBeDefined();
      expect(grid.stages[0].matches[1]).toBeDefined();
      expect(grid.stages[0].matches[2]).toBeDefined();
      expect(grid.stages[0].matches[3]).toBeDefined();
      expect(grid.stages[0].matches[4]).toBeDefined();
      expect(grid.stages[0].matches[5]).toBeDefined();
      expect(grid.stages[0].matches[6]).toBeDefined();
      expect(grid.stages[0].matches[7]).toBeDefined();
      expect(grid.stages[1].matches[0]).toBeDefined();
      expect(grid.stages[1].matches[1]).toBeDefined();
      expect(grid.stages[1].matches[2]).toBeDefined();
      expect(grid.stages[1].matches[3]).toBeDefined();
      expect(grid.stages[2].matches[0]).toBeDefined();
      expect(grid.stages[2].matches[1]).toBeDefined();
      expect(grid.stages[3].matches[0]).toBeDefined();
      expect(grid.stages[3].matches[1]).not.toBeDefined();
      expect(grid.stages[4]).not.toBeDefined();
    });
  });
});
