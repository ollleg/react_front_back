import express from 'express'
import bodyParser from 'body-parser'
import { endpoint } from './utils/endpoint'
import { save_product } from './api/v1/products/save_product'
import { list_products } from './api/v1/products/list_products'
import { delete_product } from './api/v1/products/delete_product'

require('dotenv').config()

const app = express()
app.use(bodyParser.json())

endpoint('GET', '/api/v1/products', app, ({req, res}) => {
  return list_products()
})

endpoint('PUT', '/api/v1/products', app, ({req, res}) => {
  const product = req.body
  return save_product({product})
})

endpoint('DELETE', '/api/v1/products/:id', app, ({req, res}) => {
  const {id} = req.params
  return delete_product(id)
})

app.listen(process.env.PORT, () => {
  console.log('Server running on http://localhost:'+process.env.PORT)
})