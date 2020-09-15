import React, { Component } from "react";
import axios from 'axios';
import Validator from '../../services/ValidatorService';
import Input from './Input';

export default class Edit extends Component {
  constructor(props) {
    super(props)
    this.state = {error: {}}
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    axios.get(process.env.REACT_APP_BACKEND_API_URL+'products/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          name: res.data.name,
          price: res.data.price,
          description: res.data.description
        });
      })
      .catch((error) => {
        this.props.history.goBack();
      })
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
         error: errors
      }))
  
      const rules = {
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
      axios.put(process.env.REACT_APP_BACKEND_API_URL+'products/' + this.props.match.params.id, product)
        .then((res) => {
            // Redirect to Product List 
            this.props.history.push({
              pathname: '/products-listing',
              state: { action: 'Edited' }
            });
        }).catch((error) => {
          this.setState({
            error: error.response.data.errors
          });
        })
    }
  }
}

render() {
  return (<>
    <Input 
      submit={this.onSubmit} 
      error={this.state.error} 
      name={this.state.name} 
      description={this.state.description}
      price={this.state.price}
      action={"Edit"}/>   
  </>
  );
}
}