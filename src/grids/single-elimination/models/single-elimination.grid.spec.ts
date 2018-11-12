import 'reflect-metadata';
import 'es6-shim';

import {SingleEliminationGrid} from './single-elimination.grid';
import * as _ from 'lodash';
import {EMPTY_PLAYER, Match, Player, Stage} from '../../../models';
import {IGridConfig} from '../../../interfaces';
import {classToPlain, deserialize, serialize} from 'class-transformer';

describe('SingleElimination Grid', () => {
  let config: IGridConfig;

  let players2: Player[];
  let players4: Player[];
  let players8: Player[];
  let players16: Player[];

  beforeEach(() => {
    config = { prizePlaces: 3 };
    (_ as any).shuffle = collections => collections;

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

  describe('should be generateStages', () => {
    it('countStages 1', () => {
      expect(() => { new SingleEliminationGrid([new Player('1')], config); }).toThrow(Error);
    });

    it('countStages 3', () => {
      const grid = new SingleEliminationGrid(players8, config);

      expect(grid.stages.length).toBe(3);
      expect(grid.stages[0].matches.length).toBe(4);
      expect(grid.stages[1].matches.length).toBe(2);
    });

    it('countStages 4', () => {
      const grid = new SingleEliminationGrid(players16, config);

      expect(grid.stages.length).toBe(4);
      expect(grid.stages[0].matches.length).toBe(8);
      expect(grid.stages[1].matches.length).toBe(4);
      expect(grid.stages[2].matches.length).toBe(2);
    });
  });

  describe('should be winEmptyPlayers', () => {
    it('stageId 0', () => {
      const grid = new SingleEliminationGrid(players8, config);
      (grid as any)._stages = [new Stage(), new Stage(), new Stage()];
      (grid as any)._stages[0].matches = [new Match(), new Match(), new Match()];
      (grid as any)._stages[1].matches = [new Match(), new Match()];
      (grid as any)._stages[2].matches = [new Match()];

      (grid as any)._stages[0].matches[0].players[0] = new Player('1');
      (grid as any)._stages[0].matches[0].players[1] = EMPTY_PLAYER;
      (grid as any)._stages[0].matches[1].players[0] = new Player('2');
      (grid as any)._stages[0].matches[1].players[1] = new Player('3');
      (grid as any)._stages[0].matches[2].players[0] = new Player('5');
      (grid as any)._stages[0].matches[2].players[1] = EMPTY_PLAYER;

      (grid as any).winEmptyPlayers(0);

      expect(grid.stages[1].matches[0].players[0].id).toBe('1');
      expect(grid.stages[1].matches[0].players[1]).not.toBeDefined();
      expect(grid.stages[1].matches[1].players[0].id).toBe('5');
      expect(grid.stages[1].matches[1].players[1]).not.toBeDefined();
    });
  });

  describe('should be cancelMatchResultAndRevertMovePlayers', () => {
    it('cancel start match', () => {
      const grid = new SingleEliminationGrid(players8, config);
      (grid as any)._stages = [new Stage(), new Stage(), new Stage()];
      (grid as any)._stages[0].matches = [new Match(), new Match(), new Match(), new Match()];
      (grid as any)._stages[1].matches = [new Match(), new Match()];
      (grid as any)._stages[2].matches = [new Match()];

      (grid as any)._stages[0].matches[0].players[0] = new Player('1');
      (grid as any)._stages[0].matches[0].players[1] = new Player('2');
      (grid as any)._stages[0].matches[1].players[0] = new Player('3');
      (grid as any)._stages[0].matches[1].players[1] = new Player('4');
      (grid as any)._stages[0].matches[2].players[0] = new Player('5');
      (grid as any)._stages[0].matches[2].players[1] = new Player('6');
      (grid as any)._stages[0].matches[3].players[0] = new Player('7');
      (grid as any)._stages[0].matches[3].players[1] = new Player('8');

      (grid as any)._stages[1].matches[0].players[0] = new Player('1');
      (grid as any)._stages[1].matches[0].players[1] = new Player('3');
      (grid as any)._stages[1].matches[1].players[0] = new Player('5');
      (grid as any)._stages[1].matches[1].players[1] = new Player('7');

      (grid as any)._stages[2].matches[0].players[0] = new Player('1');
      (grid as any)._stages[2].matches[0].players[1] = new Player('5');

      grid.cancelMatchResultAndRevertMovePlayers((grid as any)._stages[0].matches[1]);

      expect(grid.stages[1].matches[0].players[0]).toBeDefined();
      expect(grid.stages[1].matches[0].scores[0]).not.toBeDefined();
      expect(grid.stages[1].matches[0].players[1]).not.toBeDefined();
      expect(grid.stages[1].matches[0].scores[1]).not.toBeDefined();

      expect(grid.stages[2].matches[0].players[0]).not.toBeDefined();
      expect(grid.stages[2].matches[0].scores[0]).not.toBeDefined();
      expect(grid.stages[2].matches[0].players[1]).toBeDefined();
      expect(grid.stages[2].matches[0].scores[1]).not.toBeDefined();
    });
  });

  describe('should be third match', () => {
    it('prize place 1', () => {
      const grid = new SingleEliminationGrid(players4, { prizePlaces: 1 });
      expect(grid.stages[1].matches[1]).not.toBeDefined();
    });

    it('prize place 2', () => {
      const grid = new SingleEliminationGrid(players4, { prizePlaces: 2 });
      expect(grid.stages[1].matches[1]).not.toBeDefined();
    });

    it('prize place 3', () => {
      const grid = new SingleEliminationGrid(players4, { prizePlaces: 3 });
      expect(grid.stages[1].matches[1]).toBeDefined();
    });

  });

  describe('should be winPlayerInMatch', () => {
    it('currect match win', () => {
      const grid = new SingleEliminationGrid(players8, config);
      (grid as any)._stages = [new Stage(), new Stage(), new Stage()];
      (grid as any)._stages[0].matches = [new Match(), new Match(), new Match(), new Match()];
      (grid as any)._stages[1].matches = [new Match(), new Match()];
      (grid as any)._stages[2].matches = [new Match()];

      (grid as any)._stages[0].matches[0].players[0] = new Player('1');
      (grid as any)._stages[0].matches[0].players[1] = new Player('2');

      (grid as any)._stages[0].matches[1].players[0] = new Player('3');
      (grid as any)._stages[0].matches[1].players[1] = new Player('4');

      grid.setScoreAndMovePlayers((grid as any)._stages[0].matches[0], (grid as any)._stages[0].matches[0].bo, 0);
      grid.setScoreAndMovePlayers((grid as any)._stages[0].matches[1], 0, (grid as any)._stages[0].matches[0].bo);

      expect(grid.stages[0].matches[0].closed).toBe(true);
      expect(grid.stages[1].matches[0].players[0].id).toBe('1');
      expect(grid.stages[1].matches[0].players[1].id).toBe('4');
    });

    it('incurrect match win', () => {
      const grid = new SingleEliminationGrid(players8, config);
      (grid as any)._stages = [new Stage(), new Stage(), new Stage()];
      (grid as any)._stages[0].matches = [new Match(), new Match(), new Match(), new Match()];
      (grid as any)._stages[1].matches = [new Match(), new Match()];
      (grid as any)._stages[2].matches = [new Match()];

      (grid as any)._stages[0].matches[0].players[0] = new Player('1');

      expect(() => {
        grid.setScoreAndMovePlayers((grid as any)._stages[0].matches[0], (grid as any)._stages[0].matches[0].bo, 0);
      }).toThrow(Error);
    });

    it('match win with third place', () => {
      const grid = new SingleEliminationGrid(players4, config);

      (grid as any)._stages[0].matches[0].players[0] = new Player('1');
      (grid as any)._stages[0].matches[0].players[1] = new Player('2');
      (grid as any)._stages[0].matches[1].players[0] = new Player('3');
      (grid as any)._stages[0].matches[1].players[1] = new Player('4');

      (grid as any).setScoreAndMovePlayers((grid as any)._stages[0].matches[0], (grid as any)._stages[0].matches[0].bo, 0);
      (grid as any).setScoreAndMovePlayers((grid as any)._stages[0].matches[1], (grid as any)._stages[0].matches[1].bo, 0);

      expect(grid.stages[1].matches[0].players[0].id).toBe('1');
      expect(grid.stages[1].matches[0].players[1].id).toBe('3');
      expect(grid.stages[1].matches[1].players[0].id).toBe('2');
      expect(grid.stages[1].matches[1].players[1].id).toBe('4');
    });
  });

  describe('should be initFirstStage', () => {
    it('3 players', () => {
      const grid = new SingleEliminationGrid(players4, config);

      expect(grid.stages[0].matches[0].players[0]).toBe(players4[3]);
      expect(grid.stages[0].matches[0].players[1]).toBe(players4[1]);
      expect(grid.stages[0].matches[1].players[0]).toBe(players4[2]);
      expect(grid.stages[0].matches[1].players[1]).toBe(players4[0]);
    });

  });

  describe('should be generateGrid players', () => {
    beforeEach(() => {
      config = { prizePlaces: 2 };
    });

    it('players 2', () => {
      const grid = new SingleEliminationGrid([new Player('1'), new Player('2')], config);

      expect(grid.stages[0].matches[0]).toBeDefined();
      expect(grid.stages[0].matches[1]).not.toBeDefined();
      expect(grid.stages[1]).not.toBeDefined();
    });

    it('players 3', () => {
      const grid = new SingleEliminationGrid([new Player('1'), new Player('2'), new Player('3')], config);

      const closed = grid.stages[0].matches[0].closed || grid.stages[0].matches[1].closed;
      expect(grid.stages[0].matches[0]).toBeDefined();
      expect(grid.stages[0].matches[1]).toBeDefined();
      expect(grid.stages[1].matches[0]).toBeDefined();
      expect(grid.stages[1].matches[1]).not.toBeDefined();
      expect(grid.stages[2]).not.toBeDefined();
      expect(closed).toBe(true);
    });

    it('players 4', () => {
      const grid = new SingleEliminationGrid(players4, config);

      expect(grid.stages[0].matches[0]).toBeDefined();
      expect(grid.stages[0].matches[1]).toBeDefined();
      expect(grid.stages[1].matches[0]).toBeDefined();
      expect(grid.stages[1].matches[1]).not.toBeDefined();
      expect(grid.stages[2]).not.toBeDefined();
    });

    it('players 5', () => {
      players4[4] = new Player('5');
      const grid = new SingleEliminationGrid(players4, config);

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
      const grid = new SingleEliminationGrid(players8, config);

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
      players8[8] = new Player('9');
      const grid = new SingleEliminationGrid(players8, config);

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

  describe('should be findMatchByPlayer', () => {
    it('findMatchByPlayer', () => {
      const grid = new SingleEliminationGrid(players4, config);
      const match = grid.findMatchByPlayer(players4[3].id);

      expect(match._id).toBe(grid.stages[0].matches[0]._id);
    });

    it('findMatchByPlayer not match', () => {
      const grid = new SingleEliminationGrid(players4, config);
      const match = grid.findMatchByPlayer('test');

      expect(match).toBe(null);
    });
  });

  describe('should be getMatch', () => {
    it('getMatch', () => {
      const grid = new SingleEliminationGrid(players4, config);
      grid.stages[1].matches[0]._id = 'test';

      const match = grid.getMatch('test');

      expect(match._id).toBe(grid.stages[1].matches[0]._id);
    });

    it('not find match in getMatch', () => {
      const grid = new SingleEliminationGrid(players4, config);
      const match = grid.getMatch('test');

      expect(match).toBe(null);
    });
  });

  describe('should be getWinner', () => {

    beforeEach(() => {
      players8[7] = new Player('8');
    });

    function setGrid(grid: SingleEliminationGrid) {
      const bo = (grid as any)._stages[0].matches[0].bo;
      const scoreLooser = 0;

      grid.setScoreAndMovePlayers(grid.stages[0].matches[0], bo, scoreLooser);
      grid.setScoreAndMovePlayers(grid.stages[0].matches[1], scoreLooser, bo);
      grid.setScoreAndMovePlayers(grid.stages[0].matches[2], bo, scoreLooser);
      grid.setScoreAndMovePlayers(grid.stages[0].matches[3], scoreLooser, bo);

      if (grid.stages[1]) {
        grid.setScoreAndMovePlayers(grid.stages[1].matches[0], scoreLooser, bo);
        grid.setScoreAndMovePlayers(grid.stages[1].matches[1], bo, scoreLooser);
      }

      if (grid.stages[2]) {
        grid.setScoreAndMovePlayers(grid.stages[2].matches[0], bo, scoreLooser);
      }
    }

    it('winner 1', () => {
      const grid = new SingleEliminationGrid(players8, { prizePlaces: 1 });
      setGrid(grid);

      const winners = grid.getWinners();

      expect(winners.length).toBe(1);
      expect(winners[0].id).toBe(players8[2].id);
    });

    it('winner 2', () => {
      const grid = new SingleEliminationGrid(players8, { prizePlaces: 2 });
      setGrid(grid);

      const winners = grid.getWinners();

      expect(winners.length).toBe(2);
      expect(winners[0].id).toBe(players8[2].id);
      expect(winners[1].id).toBe(players8[5].id);
    });

    it('winner 3 without third close', () => {
      const grid = new SingleEliminationGrid(players8, { prizePlaces: 3 });
      setGrid(grid);

      const winners = grid.getWinners();

      expect(winners.length).toBe(3);
      expect(winners[0].id).toBe(players8[2].id);
      expect(winners[1].id).toBe(players8[5].id);
      expect(winners[2]).not.toBeTruthy();
    });

    it('winner 3 with third close', () => {
      const grid = new SingleEliminationGrid(players8, { prizePlaces: 3 });
      setGrid(grid);
      grid.setScoreAndMovePlayers(grid.stages[2].matches[1], 0, grid.stages[2].matches[1].bo);

      const winners = grid.getWinners();

      expect(winners.length).toBe(3);
      expect(winners[0].id).toBe(players8[2].id);
      expect(winners[1].id).toBe(players8[5].id);
      expect(winners[2].id).toBe(players8[0].id);
    });

    it('winner 4 prizePlaces', () => {
      const grid = new SingleEliminationGrid(players8, { prizePlaces: 4 });
      setGrid(grid);
      grid.setScoreAndMovePlayers(grid.stages[2].matches[1], 0, grid.stages[2].matches[1].bo);

      const winners = grid.getWinners();

      expect(winners.length).toBe(4);
      expect(winners[0].id).toBe(players8[2].id);
      expect(winners[1].id).toBe(players8[5].id);
      expect(winners[2].id).toBe(players8[0].id);
      expect(winners[3].id).toBe(players8[7].id);
    });

    it('winner 4 outputPlayersCount', () => {
      const grid = new SingleEliminationGrid(players8, { playersNextGrid: 4 });
      setGrid(grid);

      const winners = grid.getWinners();

      expect(winners.length).toBe(4);
      expect(winners[0].id).toBe(players8[7].id);
      expect(winners[1].id).toBe(players8[2].id);
      expect(winners[2].id).toBe(players8[5].id);
      expect(winners[3].id).toBe(players8[0].id);
    });
  });
});
