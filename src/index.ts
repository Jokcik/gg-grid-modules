import {SingleEliminationController} from './single-elimination/single-elimination.controller';
import {DoubleEliminationController} from './double-elimination/double-elimination.controller';

const single = new SingleEliminationController();
const double = new DoubleEliminationController();

double.generateGrid(['1', '2', '3', '4', '5', '6', '7', '8']);