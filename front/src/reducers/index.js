import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import productReducer from 'reducers/product'

export default (history) => combineReducers({
  router: connectRouter(history),
  productReducer
})
