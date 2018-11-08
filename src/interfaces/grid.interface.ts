import {Stage} from '../models';
import {Match} from '../models';
import {Player} from '../models';
import {DeepDiff} from './deep-diff';
import {IPlayer} from './player.interface';

export abstract class Grid {
  public _id: string;
  protected _stages: Stage[];
  get stages() {
    return this._stages;
  }

  /**
   * Устанавливает результат в матче и продвигает игрока дальше по сетке
   * @param match матч
   * @param scorePlayers очки участников
   */
  public abstract setScoreAndMovePlayers(match: Match, ...scorePlayers: number[]): void;

  /**
   * Сбрасывает результат в матче
   * @param match матч
   */
  public abstract cancelMatchResultAndRevertMovePlayers(match: Match);

  /**
   * Возвращает матч по id
   * @param matchId идентификатор матча
   * @return Match матч в сетке
   */
  public abstract getMatch(matchId: string): Match;

  /**
   * Возвращается последний матч, в котором играет участвует игрок
   * @param playerId идентификатор игрока
   * @return Match матч в сетке
   */
  public abstract findMatchByPlayer(playerId: string): Match;

  /**
   * Возвращает json структуру из сетки
   * @return object объект с json структурой
   */
  public abstract getJson(): object;

  /**
   * Получить победителей в сетке
   * @return Player[] список игроков, которые победили в сетке
   */
  public abstract getWinners(): Player[];

  /**
   * Устанавливает игроков в первой стадии
   * @return Player[] список игроков, которые победили в сетке
   */
  public abstract setWinnersPrevGrid(winners: IPlayer[]): void;
  /**
   * Преобразует json структуру сетки
   * @return object объект с json структурой
   */
  public abstract fromJson(grid: object): Grid;

  /**
   * Возвращает разницу текущей сетки и передаваемой
   * @param grid сетка, с которой необходимо найти разницу
   * @return object разница в видео json структуры
   */
  public abstract getDiff<T extends Grid>(grid: T): DeepDiff;
}