import React, { Component } from "react";
import axios from 'axios'
import Swal from 'sweetalert2';
import Validator from '../../services/ValidatorService';
import Input from './Input';

export default class Create extends Component {
  constructor(props) {
    super(props)
    this.state = {error: {}, submitted: false}
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(state) {
    return (e) => {
      e.preventDefault();
      let errors = {};
      const product = {
          name: state.name,
          price: state.price,
          description: state.description
      };
      this.setState(prev => ({
          ...prev,
         error: errors,
         submitted: false
      }))
  
      let rules = {
        name : {
            value: product.name,
            validator: ['isNotEmpty']
        },
        price : {
            value: product.price,
            validator: ['isNotEmpty','isInt']
        },
        description : {
          value: product.description,
          validator: ['isNotEmpty']
        }
      };
      
      for (let i in rules) {
        if (rules.hasOwnProperty(i)) {
          let current_errors = Validator.validate(i, rules[i].value, rules[i].validator);
          if (current_errors.length) errors[i] = current_errors;
        }
      }
  
      this.setState({
        error: errors
      });

      if (!Object.keys(errors).length) {
        axios.post(process.env.REACT_APP_BACKEND_API_URL+'products/', product)
          .then(res => {
            if (this.props.history) {
              // Redirect to Product List 
              this.props.history.push({
                pathname: '/products-listing',
                state: { action: 'Added' }
              });
            } else {
                Swal.fire(
                  'Good job!',
                  'Product Added Successfully',
                  'success'
                );
                if (this.props.addProduct) this.props.addProduct(res.data.product);
                
                this.setState({submitted: true});
            }
          }).catch((error) => {
            this.setState({
              error: error.response.data.errors
            });
          });
      }
    }
  }

  render() {
    return (<>
      <Input submit={this.onSubmit} 
                   error={this.state.error} 
                   submitted={this.state.submitted} 
                   action={"Add"} />   
      <br></br>
      <br></br>
    </>
    );
  }
}
