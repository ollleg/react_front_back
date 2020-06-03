import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'

import createRootReducer from 'reducers'
import history from "utils/history"

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose

const store = createStore(
  createRootReducer(history),
  composeEnhancers(
    applyMiddleware(
      routerMiddleware(history),
      sagaMiddleware,
      thunkMiddleware
    )
  )
)

test('renders learn react link', () => {
  const { getByText } = render(<App store={store} history={history}/>);
  const linkElement = getByText(/Add product/i);
  expect(linkElement).toBeInTheDocument();
});
