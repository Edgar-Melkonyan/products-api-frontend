import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export default props => (
    <tr>
        <td>{props.obj.name}</td>
        <td>{props.obj.price}</td>
        <td>{props.obj.description}</td>
        <td>
            <Link className="edit-link" to={"/edit-product/" + props.obj.id}>
                <Button size="sm" variant="info">Edit</Button>
            </Link>
            <Button onClick={props.handleDelete} size="sm" variant="danger">
                Delete
            </Button>
        </td>
    </tr>
);
