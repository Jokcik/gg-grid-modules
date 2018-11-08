import 'reflect-metadata';
import 'es6-shim';
import { diff } from 'deep-diff';

const data = {
  issue: 126,
  submittedBy: 'abuzarhamza',
  title: 'readme.md need some additional example prefilter',
  posts: [
    {
      date: '2018-04-16',
      value: {
        title2: '123',
      },
      text: `additional example for prefilter for deep-diff would be great.
      https://stackoverflow.com/questions/38364639/pre-filter-condition-deep-diff-node-js`,
    },
  ],
};

const clone = JSON.parse(JSON.stringify(data));
clone.issue = 1;
clone.title = 'README.MD needs additional example illustrating how to prefilter';
clone.disposition = 'completed';
clone.posts[0].value.title2 = 'title';
clone.posts[1] = {date: '123', text: 'title555'};

delete clone.posts[0].date;

const two = diff(data, clone);
const none = diff(data, clone,
  (path, key) => path.length === 0 && ~['title', 'disposition'].indexOf(key)
);

console.log(two);