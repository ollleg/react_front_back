import React, {Component} from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'

import history from "utils/history"
import {saveProduct} from 'reducers/product'
import ProductEdit from 'components/product/ProductEdit'

class ProductsEditPage extends Component {
  constructor(props) {
    super(props)
  }

  saveProduct(product) {
    const {saveProduct} = this.props
    saveProduct(product, ()=>{
      history.push('/')
    })
  }

  render() {
    const {products, match} = this.props
    const {id} = match.params
    let product = null
    products.forEach((p) => {
      if(p.id == id) product = p
    })

    return <div className='product-edit-page'>
      { product && 
        <ProductEdit 
          product={product} 
          onSave={(product) => this.saveProduct(product)}
          onCancel={() => history.push('/')}>
        </ProductEdit> }
    </div>
  }
}

ProductsEditPage.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
  match: PropTypes.object,
  saveProduct: PropTypes.func
}

const mapStateToProps = (state) => {
  const {products} = state.productReducer
  return {
    products
  }
}

const mapDispatchToProps = { saveProduct }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsEditPage)