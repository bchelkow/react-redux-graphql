import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'

import { queryReducer } from "./reducers/reducers";
import { QueryContainer } from "./components/query.jsx";

class App extends React.Component {
  render() {
    return <QueryContainer />;
  }
}

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware
)(createStore);

render(
  <Provider store={createStoreWithMiddleware(queryReducer)}>
    <App />
  </Provider>,
  document.getElementById('app'));