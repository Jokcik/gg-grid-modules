import {SingleEliminationController} from './single-elimination/single-elimination.controller';
import {EMPTY_PLAYER, Player} from './models/player';
// import {DoubleEliminationController} from './double-elimination/double-elimination.controller';
// import {EMPTY_PLAYER} from './single-elimination/models/match';

const single = new SingleEliminationController();
// const double = new DoubleEliminationController();

const players = Array(4);
players[0] = new Player('1');
players[1] = EMPTY_PLAYER;
players[2] = new Player('2');
players[3] = new Player('3');

single.generateGrid(players);









