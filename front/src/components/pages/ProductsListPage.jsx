import React, {Component} from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'

import ProductsList from 'components/product/ProductsList'
import ProductImageDropzone from 'components/product/ProductImageDropzone'
import {saveProduct, deleteProduct} from 'reducers/product'
import history from "utils/history"

class ProductsListPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: ''
    }
  }

  createProduct(picture) {
    const {saveProduct} = this.props
    const defProduct = {
      name: 'New product',
      quantity: 0,
      color: 'white',
      price: 1,
      picture
    }
    saveProduct(defProduct, (id) => {
      history.push('/edit/' + id)
    })
  }

  render() {
    const {search} = this.state
    const {products, deleteProduct} = this.props
    const filteredProducts = products.filter((p) => {
      return p.name && p.name.toLowerCase().includes(search.toLowerCase())
    })
    return <div className='product-list-page'>
      <input 
        value={search} 
        placeholder='Search...' 
        onChange={(e) => this.setState({search: e.target.value})} />
      <div className='add-product-controls'>
        <button onClick={() => {this.createProduct()}}>Add product</button>
        <ProductImageDropzone onDrop={(picture) => {this.createProduct(picture)}}></ProductImageDropzone>
      </div>
      <ProductsList products={filteredProducts} onDelete={(id) => {deleteProduct(id)}}></ProductsList>
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