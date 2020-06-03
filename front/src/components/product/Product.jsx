import React, {Component} from 'react'
import { PropTypes } from 'prop-types'

import history from "utils/history"

class Product extends Component {
  constructor(props) {
    super(props)
  }

  onDelete(e, id) {
    const {onDelete} = this.props
    e.stopPropagation()
    onDelete(id)
  }

  render() {
    const {product} = this.props
    const {name, id, picture, quantity, color, price} = product
    return <div className='product-card' onClick={() => {history.push('/edit/' + id)}}>  
      <div className='picture' style={{ backgroundImage: `url(${picture})` }}/>
      <div className='info'>
        <div className='title'>{name}</div>
        <div>{quantity ? quantity + ' items' : 'Out of order'}</div>
        <div>{color}</div>
        <div>{price + '$'}</div>
        <button onClick={(e) => {this.onDelete(e,id)}}>
          <span className="material-icons">
            clear
          </span>
        </button> 
      </div>
    </div>
  }
}

Product.propTypes = {
  product: PropTypes.object,
  onDelete: PropTypes.func
}


export default Product