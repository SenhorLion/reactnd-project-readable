# Readable

This is the source code for my final assessment project for Udacity's React Redux course. It is an example of knowledge and skills gained in using `React` and managing state using `Redux`.

### Project overview

Readable is a content and comment web app. Users will be able to post content to predefined categories, comment on their posts and other users' posts, and vote on posts and comments. Users will also be able to edit and delete posts and comments.

At its core it is a React application bootstrapped using [Create React App](https://github.com/facebookincubator/create-react-app).

This content and comment structure is common across a large number of websites and applications, from news sites to blogs to aggregators like Hacker News and Reddit. By building this project, you will gain an understanding of how Redux can function in a standard type of application.

## Start Developing

To view the finished project in a browser:

* Install and start the API server:

  * `cd api-server`
  * `yarn install` or `npm install`
  * `node server`

* In another terminal window, start the frontend:
  * `cd frontend`
  * `yarn install` or `npm install`
  * `yarn start` or `npm start`

## [API Server](api-server/README.md)

The server - _Provided by Udacity_ - is built in Node, but it is very simple. You won't need to edit the server code; instead, your code will talk to the server using documented API endpoints. You can use the server's endpoints to manage storing, reading, updating, and deleting data for your application.

Using this server, you will build a React/Redux front end for the application.

Information about the API server and how to use it can be found in its [README file](api-server/README.md).

## [React/Redux UI](frontend/README.md)

Information about the frontend and how to use it can be found in its [README file](frontend/README.md).
