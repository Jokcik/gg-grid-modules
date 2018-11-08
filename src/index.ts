import 'reflect-metadata';
import 'es6-shim';
import {GridManager} from './manager';
import {EMPTY_PLAYER, Player} from './models';
import {GridTypesEnum} from './manager';
// import { diff } from 'deep-diff';
//
// const data = {
//   issue: 126,
//   submittedBy: 'abuzarhamza',
//   title: 'readme.md need some additional example prefilter',
//   posts: [
//     {
//       date: '2018-04-16',
//       value: {
//         title2: '123',
//       },
//       text: `additional example for prefilter for deep-diff would be great.
//       https://stackoverflow.com/questions/38364639/pre-filter-condition-deep-diff-node-js`,
//     },
//   ],
// };
//
// const clone = JSON.parse(JSON.stringify(data));
// clone.issue = 1;
// clone.title = 'README.MD needs additional example illustrating how to prefilter';
// clone.disposition = 'completed';
// clone.posts[0].value.title2 = 'title';
// clone.posts[1] = { date: '123', text: 'title555' };
//
// delete clone.posts[0].date;
//
// const two = diff(data, clone);
// const none = diff(data, clone,
//   (path, key) => path.length === 0 && ~['title', 'disposition'].indexOf(key)
// );
//
// console.log(two);

const manager = new GridManager([{ playersNextGrid: 4, type: GridTypesEnum.SINGLE_ELIMINATION }, { prizePlaces: 1, type: GridTypesEnum.SINGLE_ELIMINATION }]);

const players8 = Array(8).fill(EMPTY_PLAYER);
players8[0] = new Player('1');
players8[1] = new Player('2');
players8[2] = new Player('3');
players8[3] = new Player('4');
players8[4] = new Player('5');
players8[5] = new Player('6');
players8[6] = new Player('7');
players8[7] = new Player('8');

manager.generateGrids(players8);
manager.setScoreAndMovePlayers(manager._grids[0], manager._grids[0].stages[0].matches[0], 1, 0);

console.log(manager._grids[1].stages[0].matches);

console.log((<any>manager.toJsonGrids()[1])._stages[0].matches);