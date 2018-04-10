import deepFreeze from 'deep-freeze';

import {
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
  ADD_NEW_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  GET_COMMENT_BY_POST_ID,
  COMMENT_UP_VOTE,
  COMMENT_DOWN_VOTE,
} from '../actions/actionTypes';

import { UP_VOTE, DOWN_VOTE } from '../constants';

import comments from './comments';

describe('comments reducer', () => {
  it('should handle initial state', () => {
    const defaultState = {
      isFetching: false,
      items: {},
    };
    expect(comments(undefined, {})).toEqual(defaultState);
  });

  it('should return existing comment state if no action type is found', () => {
    const commentState = {
      '894tuq4ut84ut8v4t8wun89g': {
        id: '894tuq4ut84ut8v4t8wun89g',
        parentId: '8xf0y6ziyjabvozdd253nd',
        timestamp: 1468166872634,
        body: 'Hi there! I am a COMMENT.',
        author: 'thingtwo',
        voteScore: 6,
        deleted: false,
        parentDeleted: false,
      },
      '8tu4bsun805n8un48ve89': {
        id: '8tu4bsun805n8un48ve89',
        parentId: '8xf0y6ziyjabvozdd253nd',
        timestamp: 1469479767190,
        body: 'Comments. Are. Cool.',
        author: 'thingone',
        voteScore: -5,
        deleted: false,
        parentDeleted: false,
      },
    };

    expect(comments(commentState, {})).toEqual(commentState);
  });

  it('should add a comment without mutating state', () => {
    const defaultCommentState = {
      isFetching: false,
      items: {},
    };

    // make sure state is not mutated
    deepFreeze(defaultCommentState);

    const commentId = '894tuq4ut84ut8v4t8wun89g';
    const payload = {
      id: '894tuq4ut84ut8v4t8wun89g',
      parentId: '8xf0y6ziyjabvozdd253nd',
      timestamp: 1468166872634,
      body: 'Hi there! I am a COMMENT.',
      author: 'thingtwo',
      voteScore: 6,
      deleted: false,
      parentDeleted: false,
    };

    const expected = {
      isFetching: false,
      items: {
        '894tuq4ut84ut8v4t8wun89g': {
          id: '894tuq4ut84ut8v4t8wun89g',
          parentId: '8xf0y6ziyjabvozdd253nd',
          timestamp: 1468166872634,
          body: 'Hi there! I am a COMMENT.',
          author: 'thingtwo',
          voteScore: 6,
          deleted: false,
          parentDeleted: false,
        },
      },
    };

    const addCommentAction = {
      type: ADD_NEW_COMMENT,
      comment: payload,
    };

    expect(comments(defaultCommentState, addCommentAction)).toEqual(expected);
  });

  it('should delete a comment without mutating state', () => {
    const defaultCommentState = {
      items: {
        '894tuq4ut84ut8v4t8wun89g': {
          id: '894tuq4ut84ut8v4t8wun89g',
          parentId: '8xf0y6ziyjabvozdd253nd',
          timestamp: 1468166872634,
          body: 'Hi there! I am a COMMENT.',
          author: 'thingtwo',
          voteScore: 6,
          deleted: false,
          parentDeleted: false,
        },
        '8tu4bsun805n8un48ve89': {
          id: '8tu4bsun805n8un48ve89',
          parentId: '8xf0y6ziyjabvozdd253nd',
          timestamp: 1469479767190,
          body: 'Comments. Are. Cool.',
          author: 'thingone',
          voteScore: -5,
          deleted: false,
          parentDeleted: false,
        },
      },
    };

    deepFreeze(defaultCommentState);

    const commentIdToDelete = '894tuq4ut84ut8v4t8wun89g';

    const expected = {
      items: {
        '8tu4bsun805n8un48ve89': {
          id: '8tu4bsun805n8un48ve89',
          parentId: '8xf0y6ziyjabvozdd253nd',
          timestamp: 1469479767190,
          body: 'Comments. Are. Cool.',
          author: 'thingone',
          voteScore: -5,
          deleted: false,
          parentDeleted: false,
        },
      },
    };

    const deleteCommentAction = {
      type: DELETE_COMMENT,
      id: commentIdToDelete,
    };

    expect(comments(defaultCommentState, deleteCommentAction)).toEqual(
      expected
    );
  });

  it('should edit a comment without mutating state', () => {
    const defaultCommentState = {
      items: {
        '894tuq4ut84ut8v4t8wun89g': {
          id: '894tuq4ut84ut8v4t8wun89g',
          parentId: '8xf0y6ziyjabvozdd253nd',
          timestamp: 1468166872634,
          body: 'Hi there! I am a COMMENT.',
          author: 'thingtwo',
          voteScore: 6,
          deleted: false,
          parentDeleted: false,
        },
      },
    };

    deepFreeze(defaultCommentState);

    const commentIdToEdit = '894tuq4ut84ut8v4t8wun89g';
    const payload = {
      id: '894tuq4ut84ut8v4t8wun89g',
      parentId: '8xf0y6ziyjabvozdd253nd',
      timestamp: 1468166872634,
      body: 'Well I say I feel like a new comment.',
      author: 'thingtwo',
      voteScore: 6,
      deleted: false,
      parentDeleted: false,
    };

    const expected = {
      items: {
        '894tuq4ut84ut8v4t8wun89g': {
          id: '894tuq4ut84ut8v4t8wun89g',
          parentId: '8xf0y6ziyjabvozdd253nd',
          timestamp: 1468166872634,
          body: 'Well I say I feel like a new comment.',
          author: 'thingtwo',
          voteScore: 6,
          deleted: false,
          parentDeleted: false,
        },
      },
    };

    const editCommentAction = {
      type: EDIT_COMMENT,
      comment: payload,
    };

    expect(comments(defaultCommentState, editCommentAction)).toEqual(expected);
  });

  it('should increment a comment votescore without mutating state', () => {
    const defaultCommentState = {
      items: {
        '894tuq4ut84ut8v4t8wun89g': {
          id: '894tuq4ut84ut8v4t8wun89g',
          parentId: '8xf0y6ziyjabvozdd253nd',
          timestamp: 1468166872634,
          body: 'Hi there! I am a COMMENT.',
          author: 'thingtwo',
          voteScore: 6,
          deleted: false,
          parentDeleted: false,
        },
      },
    };

    deepFreeze(defaultCommentState);

    const commentId = '894tuq4ut84ut8v4t8wun89g';

    const expected = {
      items: {
        '894tuq4ut84ut8v4t8wun89g': {
          id: '894tuq4ut84ut8v4t8wun89g',
          parentId: '8xf0y6ziyjabvozdd253nd',
          timestamp: 1468166872634,
          body: 'Hi there! I am a COMMENT.',
          author: 'thingtwo',
          voteScore: 7,
          deleted: false,
          parentDeleted: false,
        },
      },
    };

    const upVoteCommentAction = {
      type: COMMENT_UP_VOTE,
      commentId,
      option: UP_VOTE,
    };

    expect(comments(defaultCommentState, upVoteCommentAction)).toEqual(
      expected
    );
  });

  it('should decrement a comment votescore without mutating state', () => {
    const defaultCommentState = {
      items: {
        '894tuq4ut84ut8v4t8wun89g': {
          id: '894tuq4ut84ut8v4t8wun89g',
          parentId: '8xf0y6ziyjabvozdd253nd',
          timestamp: 1468166872634,
          body: 'Hi there! I am a COMMENT.',
          author: 'thingtwo',
          voteScore: 6,
          deleted: false,
          parentDeleted: false,
        },
      },
    };

    deepFreeze(defaultCommentState);

    const commentId = '894tuq4ut84ut8v4t8wun89g';

    const expected = {
      items: {
        '894tuq4ut84ut8v4t8wun89g': {
          id: '894tuq4ut84ut8v4t8wun89g',
          parentId: '8xf0y6ziyjabvozdd253nd',
          timestamp: 1468166872634,
          body: 'Hi there! I am a COMMENT.',
          author: 'thingtwo',
          voteScore: 5,
          deleted: false,
          parentDeleted: false,
        },
      },
    };

    const downVoteCommentAction = {
      type: COMMENT_UP_VOTE,
      commentId,
      option: DOWN_VOTE,
    };

    expect(comments(defaultCommentState, downVoteCommentAction)).toEqual(
      expected
    );
  });
});
