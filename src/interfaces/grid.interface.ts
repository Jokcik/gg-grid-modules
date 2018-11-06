import {Stage} from '../models/stage';
import {Match} from '../models/match';

export abstract class Grid {
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
   * Преобразует json структуру сетки
   * @return object объект с json структурой
   */
  public abstract fromJson<T extends Grid>(grid: object): T;

  /**
   * Возвращает разницу текущей сетки и передаваемой
   * @param grid сетка, с которой необходимо найти разницу
   * @return object разница в видео json структуры
   */
  public abstract getDiff<T extends Grid>(grid: T): object;
}