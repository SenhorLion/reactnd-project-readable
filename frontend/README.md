# Readable: React/Redux UI

## TL;DR

To view the finished project in a browser:

* In a terminal window, start the frontend:

  * install all project dependencies with `yarn install` or `npm install`
  * start the development server with `yarn start` or `npm start`

  NB: [Make sure the API server is also running](../api-server/README.md).

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Project structure

```bash
├── README.md - This file.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── yarn.lock # yarn lock file.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── actions # Redux action creators:
    │   ├── actions.js
    ├── components # All component modules:
    │   ├── App.js # This is the root of your app. The Entry point for all.
    │   ├── App.css # This is the root of your app. The Entry point for all.
    │   ├── App.test.js # This is the root of your app. The Entry point for all.
    ├── reducers # Redux reducers:
    │   ├── reducers.js
    ├── store # Redux store:
    │   ├── Store.js
    ├── utils # Utility and Helper functionality:
    │   ├── utils.js
    ├── index.css # Global styles. You probably won't need to change anything here.
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
```
