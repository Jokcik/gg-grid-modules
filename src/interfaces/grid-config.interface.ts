import {GridTypesEnum} from '../manager';

export interface IGridConfig {
  type?: GridTypesEnum;
  prizePlaces?: number;
  outputPlayersCount?: number;
  [key: string]: any;
}