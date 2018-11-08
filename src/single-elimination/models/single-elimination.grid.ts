import {Grid} from '../../interfaces/grid.interface';
import {Stage} from '../../models/stage';
import {EMPTY_PLAYER, Player} from '../../models/player';
import {IPlayer} from '../../interfaces/player.interface';
import {IGridConfig} from '../../interfaces/grid-config.interface';
import {Match} from '../../models/match';
import {shuffle} from 'lodash';
import { diff } from 'deep-diff';
import {classToPlain, Exclude, Expose, plainToClass, serialize} from 'class-transformer';
import {DeepDiff} from '../../interfaces/deep-diff';

@Exclude()
export class SingleEliminationGrid extends Grid {
  @Expose()
  protected _stages: Stage[];

  @Expose()
  get type() {
    return 'SingleEliminationGrid';
  }

  constructor(private players: IPlayer[],
              private config: IGridConfig) {
    super();
    const countStages = Math.ceil(Math.log2(this.players.length)) || 1;
    if (players.length < 2) { throw new Error('Количество игроков должно быть больше 1'); }

    this.generateStages(countStages);
    if (config.prizePlaces > 2) {
      this.addThird();
    }

    if (config.playersNextGrid) {
      const winnerCountStages = config.playersNextGrid / 2;
      const stageIndex = this.stages.findIndex(stage => stage.matches.length === winnerCountStages);
      this._stages = this.stages.slice(0, stageIndex);
    }

    this.initFirstStage(this.players);
    this.winEmptyPlayers(0);
  }

  public findMatchByPlayer(playerId: string): Match {
    for (const stage of this._stages) {
      for (const match of stage.matches) {
        if (match.players && match.players.some(player => player.id === playerId)) {
          return match;
        }
      }
    }

    return null;
  }

  public fromJson(grid: object): Grid {
    return plainToClass(SingleEliminationGrid, grid);
  }

  public getDiff<T extends Grid>(grid: T): DeepDiff {
    const currentJson = this.getJson();
    const gridJson = grid.getJson();

    return diff(currentJson, gridJson);
  }

  public getJson(): object {
    return classToPlain(this);
  }

  public getMatch(matchId: string): Match {
    for (const stage of this._stages) {
      for (const match of stage.matches) {
        if (match._id === matchId) {
          return match;
        }
      }
    }

    return null;
  }

  public setScoreAndMovePlayers(match: Match, ...scorePlayers: number[]): void {
    if (scorePlayers.length !== 2) { throw new Error('Неверное количество очков'); }
    if (!match.players[0] || !match.players[1]) { throw new Error('В матче должно быть 2 игрока'); }

    match.setScore(scorePlayers[0], scorePlayers[1]);
    if (!match.closed) { return; }

    const [stageIdx, matchIdx] = this.getStageAndMatchIdx(match);
    if (!this.stages[stageIdx + 1]) { return; }

    const nextMatchIdx = this.getNextMatchIdx(matchIdx);
    if (matchIdx % 2 === 0) {
      this._stages[stageIdx + 1].matches[nextMatchIdx].players[0] = match.winner;
    } else {
      this._stages[stageIdx + 1].matches[nextMatchIdx].players[1] = match.winner;
    }

    const thirdMatch = this._stages[this._stages.length - 1].matches[1];
    if (this._stages.length - 2 === stageIdx && thirdMatch) {
      if (matchIdx === 0) {
        thirdMatch.players[0] = match.loser;
      } else {
        thirdMatch.players[1] = match.loser;
      }
    }
  }

  public cancelMatchResultAndRevertMovePlayers(match: Match) {
    const [stageIdx, matchIdx] = this.getStageAndMatchIdx(match);
    match.clear();

    let currentMatchId = matchIdx;
    const players: Player[] = [];
    for (let i = stageIdx; i < this._stages.length; ++i) {
      const currentMatch = this._stages[i].matches[currentMatchId];

      if (i !== stageIdx) {
        if (currentMatch.players[0] && players.find(player => player.id === currentMatch.players[0].id)) {
          currentMatch.clear();
          delete currentMatch.players[0];
        } else if (currentMatch.players[1] && players.find(player => player.id === currentMatch.players[1].id)) {
          currentMatch.clear();
          delete currentMatch.players[1];
        }
      }

      players.push(currentMatch.players[0] || new Player(), currentMatch.players[1] || new Player());
      currentMatchId = this.getNextMatchIdx(matchIdx);
    }
  }

  private addThird() {
    const match = new Match();
    this._stages[this._stages.length - 1].matches.push(match);
  }

  private generateStages(countStages: number): Stage[] {
    this._stages = [];
    for (let i = 1; i <= countStages; ++i) {
      const stage = new Stage();
      const countMatches = Math.pow(2, countStages - i);
      for (let j = 1; j <= countMatches; ++j) {
        const match = new Match();
        stage.matches.push(match);
      }

      this._stages.push(stage);
    }

    return this._stages;
  }

  private initFirstStage(players: IPlayer[]): Stage[] {
    const stage = this._stages[0];
    const matchLength = stage.matches.length;
    let playersCopy = players.slice();

    if (playersCopy.length < matchLength) {
      throw new Error('Неверное количество участников');
    }
    stage.matches.forEach(match => match.players[0] = playersCopy.pop());
    const needPlayers = matchLength - playersCopy.length;
    playersCopy.push(...Array(needPlayers).fill(EMPTY_PLAYER));
    playersCopy = shuffle(playersCopy);
    stage.matches.forEach(match => match.players[1] = playersCopy.pop());

    return this._stages;
  }

  private winEmptyPlayers(stageId: number): Stage[] {
    const stage = this._stages[stageId];
    let nextStage = this._stages[stageId + 1];
    if (!nextStage && stageId === 0) {
      nextStage = stage;
    }
    if (!nextStage) {
      throw new Error('Нет следующего stage для перехода');
    }

    stage.matches.forEach((match, idx) => {
      if (match.players[1] !== EMPTY_PLAYER) { return; }
      this.setScoreAndMovePlayers(match, match.bo, 0);
    });

    return this._stages;
  }

  public getWinners(): Player[] {
    const winners = [];

    if (this.config.playersNextGrid) {
      return this.stages[this.stages.length - 1].matches.map(match => match.winner);
    }

    winners.push(this.stages[this.stages.length - 1].matches[0].winner);

    if (this.config.prizePlaces >= 2) {
      winners.push(this.stages[this.stages.length - 1].matches[0].loser);
    }

    if (this.config.prizePlaces >= 3) {
      winners.push(this.stages[this.stages.length - 1].matches[1].winner);
    }

    if (this.config.prizePlaces === 4) {
      winners.push(this.stages[this.stages.length - 1].matches[1].loser);
    }

    return winners;
  }

  private getNextMatchIdx(matchIdx: number) {
    return Math.floor(matchIdx / 2);
  }

  private getStageAndMatchIdx(match: Match) {
    const stageIdx = this._stages.findIndex(stage => !!stage.matches.find(m => m._id === match._id));
    const matchIdx = this._stages[stageIdx].matches.findIndex(m => m._id === match._id);

    return [stageIdx, matchIdx];
  }
}