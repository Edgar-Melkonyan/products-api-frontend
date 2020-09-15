import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export default class ProductTableRow extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.obj.name}</td>
                <td>{this.props.obj.price}</td>
                <td>{this.props.obj.description}</td>
                <td>
                    <Link className="edit-link" to={"/edit-product/" + this.props.obj.id}>
                       <Button size="sm" variant="info">Edit</Button>
                    </Link>
                    <Button onClick={this.props.handleDelete} size="sm" variant="danger">
                        Delete
                    </Button>
                </td>
            </tr>
        );
    }
}