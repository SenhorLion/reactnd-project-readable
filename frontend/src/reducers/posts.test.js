import deepFreeze from 'deep-freeze';

import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  ADD_NEW_POST,
  DELETE_POST,
  SAVE_EDIT_POST,
  GET_POST_BY_ID,
  POST_UP_VOTE,
  POST_DOWN_VOTE,
} from '../actions/actionTypes';

import { UP_VOTE, DOWN_VOTE } from '../constants';

import posts from './posts';

describe('posts reducer', () => {
  it('should handle initial state', () => {
    const defaultPostState = {
      isFetching: false,
      items: {},
    };
    expect(posts(undefined, {})).toEqual(defaultPostState);
  });

  it('should return exisiting state if no action type is found', () => {
    const defaultState = {
      items: {
        '8xf0y6ziyjabvozdd253nd': {
          id: '8xf0y6ziyjabvozdd253nd',
          timestamp: 1467166872634,
          title: 'Udacity is the best place to learn React',
          body: 'Everyone says so after all.',
          author: 'thingtwo',
          category: 'react',
          voteScore: 6,
          deleted: false,
          commentCount: 2,
        },
        '6ni6ok3ym7mf1p33lnez': {
          id: '6ni6ok3ym7mf1p33lnez',
          timestamp: 1468479767190,
          title: 'Learn Redux in 10 minutes!',
          body:
            'Just kidding. It takes more than 10 minutes to learn technology.',
          author: 'thingone',
          category: 'redux',
          voteScore: -5,
          deleted: false,
          commentCount: 0,
        },
      },
    };

    expect(posts(defaultState, {})).toEqual(defaultState);
  });

  it('should return correct data strucutre for given action FETCH_POSTS_REQUEST type', () => {
    const defaultState = {
      isFetching: false,
      items: {},
    };

    // make sure state is not mutated
    deepFreeze(defaultState);

    const expected = {
      isFetching: true,
      items: {},
    };

    const requestAllPostsAction = {
      type: FETCH_POSTS_REQUEST,
    };

    expect(posts(defaultState, requestAllPostsAction)).toEqual(expected);
  });

  it('should return correct data strucutre for given action FETCH_POSTS_SUCCESS type', () => {
    const payload = [
      {
        id: '8xf0y6ziyjabvozdd253nd',
        timestamp: 1467166872634,
        title: 'Udacity is the best place to learn React',
        body: 'Everyone says so after all.',
        author: 'thingtwo',
        category: 'react',
        voteScore: 6,
        deleted: false,
        commentCount: 2,
      },
    ];

    const expected = {
      isFetching: false,
      items: {
        '8xf0y6ziyjabvozdd253nd': {
          id: '8xf0y6ziyjabvozdd253nd',
          timestamp: 1467166872634,
          title: 'Udacity is the best place to learn React',
          body: 'Everyone says so after all.',
          author: 'thingtwo',
          category: 'react',
          voteScore: 6,
          deleted: false,
          commentCount: 2,
        },
      },
    };
    const receiveAllPostsAction = {
      type: FETCH_POSTS_SUCCESS,
      posts: payload,
    };

    expect(posts(undefined, receiveAllPostsAction)).toEqual(expected);
  });

  it('should add a post without mutating state', () => {
    const defaultState = {
      isFetching: false,
      items: {},
    };

    // make sure state is not mutated
    deepFreeze(defaultState);

    const postId = '6ni6ok3ym7mf1p33lnez';
    const payload = {
      id: postId,
      timestamp: 1468479767190,
      title: 'Learn Redux in 10 minutes!',
      body: 'Just kidding. It takes more than 10 minutes to learn technology.',
      author: 'thingone',
      category: 'redux',
      voteScore: -5,
      deleted: false,
      commentCount: 0,
    };

    const expected = {
      isFetching: false,
      items: {
        '6ni6ok3ym7mf1p33lnez': {
          id: '6ni6ok3ym7mf1p33lnez',
          timestamp: 1468479767190,
          title: 'Learn Redux in 10 minutes!',
          body:
            'Just kidding. It takes more than 10 minutes to learn technology.',
          author: 'thingone',
          category: 'redux',
          voteScore: -5,
          deleted: false,
          commentCount: 0,
        },
      },
    };

    const addPostAction = {
      type: ADD_NEW_POST,
      post: payload,
    };

    expect(posts(defaultState, addPostAction)).toEqual(expected);
  });

  it('should delete a post without mutating state', () => {
    const defaultState = {
      items: {
        '8xf0y6ziyjabvozdd253nd': {
          id: '8xf0y6ziyjabvozdd253nd',
          timestamp: 1467166872634,
          title: 'Udacity is the best place to learn React',
          body: 'Everyone says so after all.',
          author: 'thingtwo',
          category: 'react',
          voteScore: 6,
          deleted: false,
          commentCount: 2,
        },
        '6ni6ok3ym7mf1p33lnez': {
          id: '6ni6ok3ym7mf1p33lnez',
          timestamp: 1468479767190,
          title: 'Learn Redux in 10 minutes!',
          body:
            'Just kidding. It takes more than 10 minutes to learn technology.',
          author: 'thingone',
          category: 'redux',
          voteScore: -5,
          deleted: false,
          commentCount: 0,
        },
      },
    };

    // make sure state is not mutated
    deepFreeze(defaultState);

    const postIdToDelete = '6ni6ok3ym7mf1p33lnez';

    const expected = {
      items: {
        '8xf0y6ziyjabvozdd253nd': {
          id: '8xf0y6ziyjabvozdd253nd',
          timestamp: 1467166872634,
          title: 'Udacity is the best place to learn React',
          body: 'Everyone says so after all.',
          author: 'thingtwo',
          category: 'react',
          voteScore: 6,
          deleted: false,
          commentCount: 2,
        },
      },
    };

    const deletePostAction = {
      type: DELETE_POST,
      id: postIdToDelete,
    };

    expect(posts(defaultState, deletePostAction)).toEqual(expected);
  });

  it('should edit a post without mutating state', () => {
    const defaultState = {
      items: {
        '8xf0y6ziyjabvozdd253nd': {
          id: '8xf0y6ziyjabvozdd253nd',
          timestamp: 1467166872634,
          title: 'Udacity is the best place to learn React',
          body: 'Everyone says so after all.',
          author: 'thingtwo',
          category: 'react',
          voteScore: 6,
          deleted: false,
          commentCount: 2,
        },
      },
    };

    // make sure state is not mutated
    deepFreeze(defaultState);

    const postId = '8xf0y6ziyjabvozdd253nd';
    const payload = {
      id: '8xf0y6ziyjabvozdd253nd',
      timestamp: 1467166872657,
      title: 'Blimey youve changed',
      body: 'Everyone says so after all.',
      author: 'thingtwo',
      category: 'react',
      voteScore: 12,
      deleted: false,
      commentCount: 6,
    };

    const expected = {
      items: {
        '8xf0y6ziyjabvozdd253nd': {
          id: '8xf0y6ziyjabvozdd253nd',
          timestamp: 1467166872657,
          title: 'Blimey youve changed',
          body: 'Everyone says so after all.',
          author: 'thingtwo',
          category: 'react',
          voteScore: 12,
          deleted: false,
          commentCount: 6,
        },
      },
    };

    const editPostAction = {
      type: SAVE_EDIT_POST,
      post: payload,
    };

    expect(posts(defaultState, editPostAction)).toEqual(expected);
  });

  it('should return a post by id', () => {
    const defaultState = {
      items: {
        '8xf0y6ziyjabvozdd253nd': {
          id: '8xf0y6ziyjabvozdd253nd',
          timestamp: 1467166872634,
          title: 'Udacity is the best place to learn React',
          body: 'Everyone says so after all.',
          author: 'thingtwo',
          category: 'react',
          voteScore: 6,
          deleted: false,
          commentCount: 2,
        },
        '6ni6ok3ym7mf1p33lnez': {
          id: '6ni6ok3ym7mf1p33lnez',
          timestamp: 1468479767190,
          title: 'Learn Redux in 10 minutes!',
          body:
            'Just kidding. It takes more than 10 minutes to learn technology.',
          author: 'thingone',
          category: 'redux',
          voteScore: -5,
          deleted: false,
          commentCount: 0,
        },
      },
    };

    // make sure state is not mutated
    deepFreeze(defaultState);

    const postId = '6ni6ok3ym7mf1p33lnez';

    const expected = {
      id: '6ni6ok3ym7mf1p33lnez',
      timestamp: 1468479767190,
      title: 'Learn Redux in 10 minutes!',
      body: 'Just kidding. It takes more than 10 minutes to learn technology.',
      author: 'thingone',
      category: 'redux',
      voteScore: -5,
      deleted: false,
      commentCount: 0,
    };

    const getPostByIdAction = {
      type: GET_POST_BY_ID,
      id: postId,
    };

    expect(posts(defaultState, getPostByIdAction)).toEqual(expected);
  });

  it('should increment a post votescore without mutating state', () => {
    const defaultPostState = {
      items: {
        '8xf0y6ziyjabvozdd253nd': {
          id: '8xf0y6ziyjabvozdd253nd',
          timestamp: 1467166872634,
          title: 'Udacity is the best place to learn React',
          body: 'Everyone says so after all.',
          author: 'thingtwo',
          category: 'react',
          voteScore: 6,
          deleted: false,
          commentCount: 2,
        },
      },
    };

    deepFreeze(defaultPostState);

    const postId = '8xf0y6ziyjabvozdd253nd';

    const expected = {
      items: {
        '8xf0y6ziyjabvozdd253nd': {
          id: '8xf0y6ziyjabvozdd253nd',
          timestamp: 1467166872634,
          title: 'Udacity is the best place to learn React',
          body: 'Everyone says so after all.',
          author: 'thingtwo',
          category: 'react',
          voteScore: 7,
          deleted: false,
          commentCount: 2,
        },
      },
    };

    const upVotePostAction = {
      type: POST_UP_VOTE,
      postId,
      option: UP_VOTE,
    };

    expect(posts(defaultPostState, upVotePostAction)).toEqual(expected);
  });

  it('should decrement a post votescore without mutating state', () => {
    const defaultPostState = {
      items: {
        '8xf0y6ziyjabvozdd253nd': {
          id: '8xf0y6ziyjabvozdd253nd',
          timestamp: 1467166872634,
          title: 'Udacity is the best place to learn React',
          body: 'Everyone says so after all.',
          author: 'thingtwo',
          category: 'react',
          voteScore: 6,
          deleted: false,
          commentCount: 2,
        },
      },
    };

    deepFreeze(defaultPostState);

    const postId = '8xf0y6ziyjabvozdd253nd';

    const expected = {
      items: {
        '8xf0y6ziyjabvozdd253nd': {
          id: '8xf0y6ziyjabvozdd253nd',
          timestamp: 1467166872634,
          title: 'Udacity is the best place to learn React',
          body: 'Everyone says so after all.',
          author: 'thingtwo',
          category: 'react',
          voteScore: 5,
          deleted: false,
          commentCount: 2,
        },
      },
    };

    const downVotePostAction = {
      type: POST_DOWN_VOTE,
      postId,
      option: DOWN_VOTE,
    };

    expect(posts(defaultPostState, downVotePostAction)).toEqual(expected);
  });
});
