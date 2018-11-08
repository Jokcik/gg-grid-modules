import {IStage} from '../interfaces/stage.interface';
import {IMatch} from '../interfaces/match.interface';
import {Exclude, Expose} from 'class-transformer';

@Exclude()
export class Stage implements IStage {
  @Expose()
  matches: IMatch[] = [];
}