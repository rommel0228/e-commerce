import { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

import ProductCardAdmin from './ProductCardAdmin'


export default function UpdateProductAdmin() {

	const { user } = useContext(UserContext);
	const navigate = useNavigate();

	const {productId} = useParams();

	// State hooks to store the values of the input fields
	// getters are variables that store data (from setters)
	// setters are function that sets the data (for the getters)
	const [name, setName] = useState();
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');

	// State to determine whether submit button is enabled or not
	const [isActive, setIsActive] = useState(false);

	console.log(name);
	console.log(description);
	console.log(price);


	function addProduct(e) {
		e.preventDefault();

	fetch(`${process.env.REACT_APP_API_URL}/products/addProduct`, {
		    method: "POST",
		    headers: {
		        'Content-Type': 'application/json'
		    },
		    body: JSON.stringify({
		        name: name,
		        description: description,
		        price: price
		    })
	})

	return (

			(user.id !== null && user.isAdmin === true) ?
					<Form onSubmit={(e) => addProduct(e)}>
						<Form.Group controlId="name">
						    <Form.Label>Product Name</Form.Label>
						    <Form.Control 
						        type="text" 
						        placeholder=`${name}`
						        value={name} 
						        onChange={e => setName(e.target.value)}
						        required
						    />
						</Form.Group>

						<Form.Group controlId="description">
						    <Form.Label>Product Description</Form.Label>
						    <Form.Control 
						    	as="textarea"
						        type="text" 
						        placeholder=`${description}`
						        value={ description } 
						        onChange={e => setDescription(e.target.value)}
						        required
						    />
						</Form.Group>

				      <Form.Group className="mb-3" controlId="price">
				        <Form.Label>Product Price</Form.Label>
				        <Form.Control 
				        	type="number" 
				        	placeholder="Enter product price"
				        	value=`${price}`
				        	onChange={e => setPrice(e.target.value)}
				        	required/>
				      </Form.Group>

				      { isActive ?
				  			<Button variant="primary" type="submit" id="submitBtn">
				  			  Submit
				  			</Button>
				  			:
				  			<Button variant="danger" type="submit" id="submitBtn" disabled>
				  			  Submit
				  			</Button>
				  		}
				    </Form>
				    :
				    <p> You are not authorized to access this page</p>


				)

}