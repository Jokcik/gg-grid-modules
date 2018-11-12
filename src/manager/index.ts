import {GridManager} from './grid-manager.controller';
import {SingleEliminationGrid} from '../grids/single-elimination/models/single-elimination.grid';
import {DoubleEliminationGrid} from '../grids/double-elimination/models/double-elimination.grid';

GridManager.register(SingleEliminationGrid);
GridManager.register(DoubleEliminationGrid);

export * from './grid-manager.controller';
export * from './grid-types.enum';