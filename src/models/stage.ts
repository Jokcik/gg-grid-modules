import {IMatch, IStage} from '../interfaces';
import {Exclude, Expose} from 'class-transformer';

@Exclude()
export class Stage implements IStage {
  @Expose()
  matches: IMatch[] = [];
}