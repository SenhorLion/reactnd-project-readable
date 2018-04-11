# Readable: React/Redux UI

## TL;DR

To view the finished project in a browser:

* In a terminal window, start the frontend:

  * Install all project dependencies with `yarn install` or `npm install`
  * Start the development server with `yarn start` or `npm start`

  NB: [Make sure the API server is also running](../api-server/README.md).

To run all tests:

* `yarn test` will run all tests.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Project structure

```bash
├── README.md - This file.
├── package.json
├── yarn.lock
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── actions # Redux action types and creators:
    │   ├── actionTypes.js
    │   ├── category-actions.js
    │   ├── comment-actions.js
    │   ├── post-actions.js
    │   ├── index.js
    ├── api # Wrapper for API calls:
    │   ├── index.js
    ├── components # All component modules:
    │   ├── category
    │   │   ├── Category.js
    │   ├── comments
    │   │   ├── CommentFormControl.js
    │   │   ├── CommentItem.js
    │   │   ├── CommentList.js
    │   │   ├── DeleteCommentModal.js
    │   ├── header
    │   │   ├── Header.js
    │   ├── posts
    │   │   ├── AddNewPost.js
    │   │   ├── DeletePostModal.js
    │   │   ├── PostDetailView.js
    │   │   ├── PostEditFormControl.js
    │   │   ├── PostEditView.js
    │   │   ├── PostFormControl.js
    │   │   ├── PostItem.js
    │   │   ├── PostList.js
    │   ├── ui # UI components
    │   │   ├── button
    │   │   │   ├── Button.js
    │   │   ├── notification
    │   │   │   ├── NotificationMessage.js
    │   │   ├── reaction # Reaction control - user upVote/downVote
    │   │   │   ├── Reaction.js # View component for reaction controls
    │   │   │   ├── ReactionComments.js # Container for comment reactions
    │   │   │   ├── ReactionPosts.js # Container for post reactions
    │   │   ├── sort # Sort controls
    │   │   │   ├── SortByControls.js
    │   │   │   ├── SortControl.js
    ├── constants # Constant types throughout app:
    │   ├── index.js
    ├── containers # Container compoennts:
    │   ├── App.js # Initially fetches data and handles all routes
    │   ├── CommentsByPost.js
    │   ├── PostDetail.js
    │   ├── PostEdit.js
    │   ├── PostsByCategory.js
    ├── css # Redux reducers:
    │   ├── _buttons.scss
    │   ├── _colors.scss
    │   ├── _modal.scss
    │   ├── App.scss
    ├── reducers # Redux reducers:
    │   ├── categories.js
    │   ├── categories.test.js
    │   ├── comments.js
    │   ├── comments.test.js
    │   ├── index.js
    │   ├── posts.js
    │   ├── posts.test.js
    ├── store # Redux store:
    │   ├── index.js # Handles configuring the store with middleware, enhancers etc...
    ├── utils # Utility and Helper functionality:
    │   ├── form-input-components.js
    │   ├── helper.js
    │   ├── sortFilter.js
    └── index.js # Wraps `App` with store provider and router.
```
