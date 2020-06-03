import React, {Component} from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'

import ProductsList from 'components/product/ProductsList'
import {saveProduct, deleteProduct} from 'reducers/product'
import history from "utils/history"

class ProductsListPage extends Component {
  constructor(props) {
    super(props)
  }

  createProduct() {
    const {saveProduct} = this.props
    const defProduct = {
      name: 'New product',
      quantity: 0,
      color: 'white',
      price: 1
    }
    saveProduct(defProduct, (id) => {
      history.push('/edit/' + id)
    })
  }

  render() {
    const {products, deleteProduct} = this.props
    return <div>
      <button onClick={() => {this.createProduct()}}>Add product</button>
      <ProductsList products={products} onDelete={(id) => {deleteProduct(id)}}></ProductsList>
    </div>
  }
}

ProductsListPage.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
  saveProduct: PropTypes.func,
  deleteProduct: PropTypes.func
}

const mapStateToProps = (state) => {
  const {products} = state.productReducer
  return {
    products
  }
}

const mapDispatchToProps = { saveProduct, deleteProduct }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsListPage)