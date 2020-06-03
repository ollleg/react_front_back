import fs from 'fs'

export const list_products = () => {
  let rawdata = fs.readFileSync('data/products.json')
  const products = JSON.parse(rawdata)
  console.log(products)
  return {products}
}
