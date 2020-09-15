import React, { PureComponent } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import TableRow from './TableRow';
import Swal from 'sweetalert2';

export default class List extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    if ( this.props.location && 
         this.props.location.state &&
         this.props.location.state.action ) {
      window.history.replaceState(null, '')
      Swal.fire(
        'Good job!',
        `Product ${this.props.location.state.action} Successfully`,
        'success'
      );
    }
    axios.get(process.env.REACT_APP_BACKEND_API_URL+'products/')
      .then(res => {
        this.setState({
          products: res.data
        });
      })
  }

  componentDidUpdate() {
    const {
      product
    } = this.props;

    const shouldUpdateState = product 
                              && product.id
                              && !this.state.products.map(exp => exp.id).includes(product.id);
    if(shouldUpdateState) {
      this.setState(prev => ({
        products: [
          ...prev.products,
          product
        ]
      }));
    }
  }

  deleteProduct(id) {
    axios.delete(process.env.REACT_APP_BACKEND_API_URL+'products/' + id)
        .then((res) => {
              if(this.props.deleteProduct) this.props.deleteProduct();
              this.setState((prevState) => ({
                products: prevState.products.filter(list => list.id !== id)
              }))
        }).catch((error) => {
          Swal.fire(
            'Failed!',
            'Could not Delete Product',
            'error'
          );
        })
  }

  render() {
    return (
      <div className="table-wrapper">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.products.length > 0 && this.state.products.map((res, i) => (
              <TableRow 
                obj={res} 
                key={res.id} 
                handleDelete={() => this.deleteProduct(res.id)}
              />
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}