import React, {Component} from 'react'
import { PropTypes } from 'prop-types'

import ProductImageDropzone from 'components/product/ProductImageDropzone'

class ProductEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      product: {...props.product}
    }
  }

  onAttrChange(attr, val) {
    const {product} = this.state
    product[attr] = val
    this.setState({product})
  }

  render() {
    const {onSave, onCancel} = this.props
    const {product} = this.state

    const {name, picture, quantity, price, color} = product
    return <div className='product-edit-card'>
      <ProductImageDropzone 
        onDrop={(picture) => this.onAttrChange('picture', picture)}
        picture={picture}
      />
      <div className='controls'>
        <input placeholder='Name' value={name} onChange={(e) => this.onAttrChange('name', e.target.value)}></input>
        <input placeholder='Quantity' value={quantity} onChange={(e) => this.onAttrChange('quantity', e.target.value)} type='number'></input>
        <input placeholder='Price' value={price} onChange={(e) => this.onAttrChange('price', e.target.value)} type='number'></input>
        <input placeholder='Color' value={color} onChange={(e) => this.onAttrChange('color', e.target.value)}></input>
        <div className='buttons'>
          <button onClick={() => {onSave(product)}}>Save</button>
          <button onClick={() => {onCancel()}}>Cancel</button>
        </div>
        
      </div>
    </div>
  }
}

ProductEdit.propTypes = {
  product: PropTypes.object,
  onSave: PropTypes.func,
  onCancel: PropTypes.func
}

export default ProductEdit