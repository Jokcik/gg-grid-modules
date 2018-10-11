import {SingleEliminationController} from './single-elimination/single-elimination.controller';
import {DoubleEliminationController} from './double-elimination/double-elimination.controller';
import {EMPTY_PLAYER} from './single-elimination/models/match';

const single = new SingleEliminationController();
const double = new DoubleEliminationController();

double.generateGrid(['1', '2', '3', '4', '5', '6', '7', EMPTY_PLAYER, '9', '10', '11', '12', '13', '14', '15', '16']);









