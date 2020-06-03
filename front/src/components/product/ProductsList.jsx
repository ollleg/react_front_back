import React, {Component} from 'react'
import { PropTypes } from 'prop-types'

import Product from 'components/product/Product'

class ProductsList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {products, onDelete} = this.props
    return <div>
      { products.map((p) => {
        return (
          <div key={p.id}>
            <Product {...p}></Product>
            <button onClick={() => {onDelete(p.id)}}>Delete</button>
          </div>
        )
      }) }
    </div>
  }
}

ProductsList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
  onDelete: PropTypes.func
}

export default ProductsList