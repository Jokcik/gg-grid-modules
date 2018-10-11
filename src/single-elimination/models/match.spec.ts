import {BestOf, Match} from './match';

describe('Match', () => {
  let bo: BestOf;
  let player1: string;
  let player2: string;

  beforeEach(() => {
    player1 = '1';
    player2 = '2';
    bo = BestOf.BO3;
  });

  it('should be create match', () => {
    const match = new Match();

    expect(match).toBeTruthy();
    expect(match.stat).toBeTruthy();
    expect(match.player1).not.toBeTruthy();
    expect(match.player2).not.toBeTruthy();
  });

  it('should be winPlayer1 not closed', () => {
    const match = new Match();
    match.player1 = player1;
    match.player2 = player2;
    match.bo = bo;

    match.winPlayer1(1);

    expect(match.player1).toBe(player1);
    expect(match.player2).toBe(player2);
    expect(match.bo).toBe(bo);
    expect(match.closed).toBe(false);
    expect(match.stat.win).not.toBeDefined();
    expect(match.stat.loss).not.toBeDefined();
    expect(match.stat.score1).toBe(1);
    expect(match.stat.score2).toBe(0);
  });

  it('should be winPlayer2 not closed', () => {
    bo = BestOf.BO9;

    const match = new Match();
    match.player1 = player1;
    match.player2 = player2;
    match.bo = bo;

    match.winPlayer2(4);

    expect(match.player1).toBe(player1);
    expect(match.player2).toBe(player2);
    expect(match.bo).toBe(bo);
    expect(match.closed).toBe(false);
    expect(match.stat.win).not.toBeDefined();
    expect(match.stat.loss).not.toBeDefined();
    expect(match.stat.score1).toBe(0);
    expect(match.stat.score2).toBe(4);
  });

  it('should be winPlayer1 closed', () => {
    const match = new Match();
    match.player1 = player1;
    match.player2 = player2;
    match.bo = bo;

    match.winPlayer1(1);
    match.winPlayer2(1);
    match.winPlayer1(1);

    expect(match.player1).toBe(player1);
    expect(match.player2).toBe(player2);
    expect(match.bo).toBe(bo);
    expect(match.closed).toBe(true);
    expect(match.stat.win).toBe(player1);
    expect(match.stat.loss).toBe(player2);
    expect(match.stat.score1).toBe(2);
    expect(match.stat.score2).toBe(1);
  });

  it('should be winPlayer2 closed', () => {
    const match = new Match();
    match.player1 = player1;
    match.player2 = player2;
    match.bo = bo;

    match.winPlayer2(2);

    expect(match.player1).toBe(player1);
    expect(match.player2).toBe(player2);
    expect(match.bo).toBe(bo);
    expect(match.closed).toBe(true);
    expect(match.stat.win).toBe(player2);
    expect(match.stat.loss).toBe(player1);
    expect(match.stat.score1).toBe(0);
    expect(match.stat.score2).toBe(2);
  });

  it('should be getNextMatchId', () => {
    const currentMatchId0 = 1;
    const currentMatchId1 = 1;
    const currentMatchId2 = 2;
    const currentMatchId3 = 3;
    const currentMatchId4 = 4;
    const currentMatchId5 = 5;

    expect(Match.getNextMatchId(currentMatchId0)).toBe(0);
    expect(Match.getNextMatchId(currentMatchId1)).toBe(0);
    expect(Match.getNextMatchId(currentMatchId2)).toBe(1);
    expect(Match.getNextMatchId(currentMatchId3)).toBe(1);
    expect(Match.getNextMatchId(currentMatchId4)).toBe(2);
    expect(Match.getNextMatchId(currentMatchId5)).toBe(2);
  });

});
