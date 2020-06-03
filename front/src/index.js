import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'

import rootSagas from 'sagas'
import createRootReducer from 'reducers'
import 'styles/index.scss'
import App from 'components/App'
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

sagaMiddleware.run(rootSagas)

ReactDOM.render(
  <React.StrictMode>
    <App 
      store={store}
      history={history}/>
  </React.StrictMode>,
  document.getElementById('root')
)