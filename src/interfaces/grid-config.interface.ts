import {GridTypesEnum} from '../manager';

export interface IGridConfig {
  type?: GridTypesEnum;
  prizePlaces?: number;
  playersNextGrid?: number;
  [key: string]: any;
}