import React, {Component} from 'react'
import { PropTypes } from 'prop-types'

import history from "utils/history"

class Product extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {name, id} = this.props
    return <div onClick={() => {history.push('/edit/' + id)}}>  
      {name}
    </div>
  }
}

Product.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  quantity: PropTypes.number,
  price: PropTypes.number,
  color: PropTypes.string,
  picture: PropTypes.string
}


export default Product