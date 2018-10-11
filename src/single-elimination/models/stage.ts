import {Match} from './match';

export class Stage {
  public matches: Match[] = [];

  public playerNextStage(prevMatchId: number, playerWin: string) {
    const nextMatchId = Match.getNextMatchId(prevMatchId);
    if (prevMatchId % 2 === 0) {
      this.matches[nextMatchId].player1 = playerWin;
    } else {
      this.matches[nextMatchId].player2 = playerWin;
    }
  }

}