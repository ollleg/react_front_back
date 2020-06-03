import { createSlice } from '@reduxjs/toolkit'

import {callApi} from 'utils/api'

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    saveProduct: {status: 'ok'}
  },
  reducers: {
    setSaveProduct(state, action) {
      const {status} = action.payload
      state.saveProduct = {status}
    },
    setProducts(state, action) {
      const {products} = action.payload
      state.products = products
    },
    clearProducts(state, action) {
      state.products = []
    }
  }
})

const { actions, reducer } = productsSlice
export const { setProducts, clearProducts, setSaveProduct } = actions
export default reducer


export const listProducts = () => async dispatch => {
  callApi('GET', `/api/v1/products`, {
    onSuccess: ({data}) => {
      const {products} = data
      dispatch(setProducts({products}))
    }, 
    onError: (err) => {
      dispatch(clearProducts())
    }
  })
}

export const saveProduct = (product, okCallback) => async dispatch => {
  callApi('PUT', `/api/v1/products`, {
    body: product,
    onSuccess: ({status, data}) => {
      const {id} = data
      dispatch(setSaveProduct({status}))
      okCallback && okCallback(id)
    }, 
    onError: (err) => {
      dispatch(setSaveProduct({status: 'error'}))
      console.log(err)
    }
  })
}

export const deleteProduct = (id) => async dispatch => {
  callApi('DELETE', `/api/v1/products/${id}`, {
    onSuccess: ({status, data}) => {
      dispatch(setSaveProduct({status}))
    }, 
    onError: (err) => {
      dispatch(setSaveProduct({status: 'error'}))
      console.log(err)
    }
  })
}