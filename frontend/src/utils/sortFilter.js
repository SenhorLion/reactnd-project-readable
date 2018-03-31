import { sortBy } from 'lodash';

const sortFilter = {
  NONE: list => list,
  TITLE: list => sortBy(list, 'title'),
  CATEGORY: list => sortBy(list, 'category'),
  VOTE_SCORE: list => sortBy(list, 'voteScore').reverse(), // reverse to see the highest count first
  COMMENT_COUNT: list => sortBy(list, 'commentCount').reverse(), // reverse to see the highest count first
  TIME_STAMP: list => sortBy(list, 'timestamp').reverse(),
};

export default sortFilter;
