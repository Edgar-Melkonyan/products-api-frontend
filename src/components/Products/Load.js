import React, { Component } from "react";

import List from './List';
import Create from './Create';

export default class Load extends Component {
  constructor(props) {
    super(props)

    // Setting up state
    this.state = {
        product: null,
    }
    this.addProduct = this.addProduct.bind(this)
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  addProduct(product) {
    this.setState({
      product: product
    })
  }

  deleteProduct = () => {
    this.setState({product: null})
  }

  render() {
    return (<>
        <Create addProduct={this.addProduct} />
        <List product={this.state.product} deleteProduct={this.deleteProduct}/>
    </>);
  }
}