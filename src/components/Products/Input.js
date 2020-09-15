import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormText from 'react-bootstrap/FormText';

export default class Input extends Component {
    constructor(props) {
        super(props)
        // Setting up functions
        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeProductPrice = this.onChangeProductPrice.bind(this);
        this.onChangeProductDescription = this.onChangeProductDescription.bind(this);    
        // Setting up state
        this.state = {
            name: '',
            description: '',
            price: '',
            shouldUpdate: true
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.submitted && !prevProps.submitted) {
            this.setState({name: '', price: '', description: ''})
        } else if ( this.props.action == 'Edit' && this.state.shouldUpdate )  {
            this.setState({
                name: this.props.name, 
                price: this.props.price, 
                description: this.props.description, 
                shouldUpdate: false})
        }
      }

    onChangeProductName(e) {
        this.setState({name: e.target.value})
    }

    onChangeProductPrice(e) {
        this.setState({price: e.target.value})
    }

    onChangeProductDescription(e) {
        this.setState({description: e.target.value})
    }

    render() {
        return (<div className="form-wrapper">
            <Form onSubmit={this.props.submit(this.state)}>
                <Row> 
                    <Col>
                    <Form.Group controlId="Name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" value={this.state.name} onChange={this.onChangeProductName}/>
                        <FormText>
                            {this.props.error.name && this.props.error.name.map((e, i) => <p className="text-danger" key={i}>{e}</p>)}
                        </FormText>
                    </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group controlId="Price">
                        <Form.Label>Price</Form.Label>
                            <Form.Control type="number" value={this.state.price} onChange={this.onChangeProductPrice}/>
                            <FormText>
                                {this.props.error.price && this.props.error.price.map((e, i) => <p className="text-danger" key={i}>{e}</p>)}
                            </FormText>
                    </Form.Group>
                    </Col>  
                </Row>
                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" type="textarea" value={this.state.description} onChange={this.onChangeProductDescription} />
                    <FormText>
                        {this.props.error.description && this.props.error.description.map((e, i) => <p className="text-danger" key={i}>{e}</p>)}
                    </FormText>
                </Form.Group>
                {this.props.action == 'Add' &&
                    <Button variant="info" size="lg" block="block" type="submit">
                        {this.props.action} Product
                    </Button>
                }
                {this.props.action == 'Edit' &&
                    <Button variant="danger" size="lg" block="block" type="submit">
                        {this.props.action} Product
                    </Button>
                }
            </Form>
        </div>);
    }
}