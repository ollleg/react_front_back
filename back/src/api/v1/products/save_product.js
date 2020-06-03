import uuidv1 from 'uuid/v1'
import fs from 'fs'
import { handledError } from '../../../utils/endpoint'

export const save_product = ({product}) => {

  // Validate product
  const {name, id, quantity, price, color, picture} = product
  let savedProduct = {name, id, quantity, price, color, picture}

  // Save product
  let rawdata = fs.readFileSync('data/products.json')
  let products = JSON.parse(rawdata)
  if(id) {
    let found = false
    products = products.map((p) => {
      if(p.id == id) {
        found = true
        return savedProduct
      } else {
        return p
      }
    })
    if(!found) {
      throw(handledError(404, 'not_found'))
    }
  } else {
    savedProduct.id = uuidv1()
    products.push(savedProduct)
  }

  let data = JSON.stringify(products);
  fs.writeFileSync('data/products.json', data)

  return savedProduct
}
