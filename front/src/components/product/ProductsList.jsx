import React, {Component} from 'react'
import { PropTypes } from 'prop-types'

import Product from 'components/product/Product'

class ProductsList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {products, onDelete} = this.props
    return <div className='products-list'>
      { products.map((p) => {
        return (
          <Product key={p.id} product={p} onDelete={(id) => onDelete(id)}></Product>
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