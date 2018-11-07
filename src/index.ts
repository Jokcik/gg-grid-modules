import {SingleEliminationController} from './single-elimination/single-elimination.controller';
import {EMPTY_PLAYER, Player} from './models/player';
// import {DoubleEliminationController} from './double-elimination/double-elimination.controller';
// import {EMPTY_PLAYER} from './single-elimination/models/match';

const single = new SingleEliminationController();
// const double = new DoubleEliminationController();

const players = Array(8);
players[0] = new Player('0');
players[1] = new Player('1');
players[2] = new Player('2');
players[3] = new Player('3');
players[4] = new Player('4');
players[5] = EMPTY_PLAYER;
players[6] = EMPTY_PLAYER;
players[7] = new Player('7');

single.generateGrid(players);









