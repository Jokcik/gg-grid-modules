import {IStage} from '../interfaces/stage.interface';
import {IMatch} from '../interfaces/match.interface';

export class Stage implements IStage {
  matches: IMatch[] = [];
}