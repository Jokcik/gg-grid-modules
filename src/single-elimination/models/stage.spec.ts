import {BestOf, Match} from './match';
import {Stage} from './stage';

describe('Stage', () => {
  let bo: BestOf;
  let player1: string;
  let player2: string;

  beforeEach(() => {
    player1 = '1';
    player2 = '2';
    bo = BestOf.BO3;
  });

  it('should be create stage', () => {
    const stage = new Stage();
    expect(stage).toBeTruthy();
  });

  it('should be playerNextStage', () => {
    const stage = new Stage();
    stage.matches = [new Match(), new Match(), new Match(), new Match()];

    stage.playerNextStage(5, player2);
    expect(stage.matches).toBeDefined();
    expect(stage.matches[2]).toBeDefined();
    expect(stage.matches[2].player2).toBe(player2);
  });

});
