import fs from 'fs'
import { handledError } from '../../../utils/endpoint'

export const delete_product = (id) => {

  // Save product
  let rawdata = fs.readFileSync('data/products.json')
  let products = JSON.parse(rawdata)
  let found = false
  products = products.filter((p) => {
    if(p.id == id) {
      found = true
      return false
    } 
    return true
  })
  if(!found) {
    throw(handledError(404, 'not_found'))
  }

  let data = JSON.stringify(products);
  fs.writeFileSync('data/products.json', data)

  return null
}
