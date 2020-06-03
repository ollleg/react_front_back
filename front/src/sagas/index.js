import { all, fork, put, take, call } from 'redux-saga/effects'

import {listProducts} from 'reducers/product'

function* refreshData() {
  
  try {
    yield put(listProducts())
  } catch (error) {
    console.error(error);
  }
}

function* trackChanges() {
  while(true) {
    const {payload} = yield take('products/setSaveProduct')
    const {status} = payload
    if(status == 'ok') {
      yield call(refreshData)
    }
  }
}

export default function * root () {
  yield all([
    fork(refreshData),
    fork(trackChanges)
  ])
}