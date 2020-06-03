import React, {Component} from 'react'
import { PropTypes } from 'prop-types'

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
    const {onSave} = this.props
    const {product} = this.state

    const {name} = product
    return <div>
      <input value={name} onChange={(e) => this.onAttrChange('name', e.target.value)}></input>
      <button onClick={() => {onSave(product)}}>Save</button>
    </div>
  }
}

ProductEdit.propTypes = {
  product: PropTypes.object,
  onSave: PropTypes.func
}

export default ProductEdit