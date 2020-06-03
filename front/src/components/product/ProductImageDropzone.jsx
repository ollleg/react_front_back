import React, { Component } from 'react'
import { PropTypes } from 'prop-types'

import Dropzone from 'react-dropzone'

class ProductDropzone extends Component {
  constructor(props) {
    super(props)
  }

  onDrop(acceptedFiles) {
    const { onDrop } = this.props
    const file = acceptedFiles[0]

    if (!["image/jpeg"].includes(file.type)) {
      alert('Unsupported picture extension. Supported formats: image/jpeg')
      return
    }

    const reader = new FileReader()
    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
      const binaryStr = reader.result
      onDrop(binaryStr)
    }

    reader.readAsDataURL(file)
  }

  render() {
    const { picture } = this.props
    return <Dropzone onDrop={acceptedFiles => this.onDrop(acceptedFiles)}>
      {({ getRootProps, getInputProps }) => (
        <div className='product-image-dropzone'>
          <div className='placeholder' {...getRootProps()}>
            <input {...getInputProps()} />
            {
              picture ? <div className='picture' style={{ backgroundImage: `url(${picture})` }} /> :
              <p>Drag 'n' drop your product picture here, or click to select file</p>
            }
          </div>
        </div>
      )}
    </Dropzone>
  }
}

ProductDropzone.propTypes = {
  onDrop: PropTypes.func,
  picture: PropTypes.string
}


export default ProductDropzone