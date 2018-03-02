import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './app/App';

const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route exact path="/" render={() => <App />} />
      </BrowserRouter>
    </Provider>
  );
};

export default Root;
