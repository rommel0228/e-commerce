import { useState, useEffect, useContext } from 'react';
import { Container, Form, Card, Button, Row, Col } from 'react-bootstrap';
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
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [stocks, setStocks] = useState('');
	const [image, setImage] = useState('');

	// State to determine whether submit button is enabled or not
	const [isActive, setIsActive] = useState(false);

	console.log(name);
	console.log(description);
	console.log(price);
	console.log(stocks);
	console.log(image)

	function updateProduct(e) {
		e.preventDefault();

	fetch(`${process.env.REACT_APP_API_URL}/products/:productId`, {
		    method: "PUT",
		    headers: {
		        'Content-Type': 'application/json'
		    },
		    body: JSON.stringify({
		        name: name,
		        description: description,
		        price: price,
		        image: image,
		        stocks:stocks
		    })
	})
	}

	return (

			(user.id !== null && user.isAdmin === true) ?
					<Form onSubmit={(e) => updateProduct(e)}>
						<Form.Group controlId="name">
						    <Form.Label>Product Name</Form.Label>
						    <Form.Control 
						        type="text" 
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
						        value={ description } 
						        onChange={e => setDescription(e.target.value)}
						        required
						    />
						</Form.Group>

				      <Form.Group className="mb-3" controlId="price">
				        <Form.Label>Product Price</Form.Label>
				        <Form.Control 
				        	type="number" 
				        	value= {price}
				        	onChange={e => setPrice(e.target.value)}
				        	required/>
				      </Form.Group>

				      <Form.Group className="mb-3" controlId="price">
				      <Form.Label>Stocks</Form.Label>
				      <Form.Control className="input-bg"
				        	type="number" 
				        	value={ stocks }
				        	onChange={e => setStocks(e.target.value)}
				        	required/>
				      </Form.Group>

				      <Form.Group className="mb-3" controlId="price">
				      <Form.Label>Image</Form.Label>
				      <Form.Control className="input-bg"
				        	type="text" 
				        	value={ image }
				        	onChange={e => setImage(e.target.value)}
				        	required/>
				      </Form.Group>


				      { isActive ?
				  			<Button variant="primary" type="submit" id="submitBtn">
				  			  Update
				  			</Button>
				  			:
				  			<Button variant="danger" type="submit" id="submitBtn" disabled>
				  			  Update
				  			</Button>
				  		}
				    </Form>
				    :
				    <p> You are not authorized to access this page</p>


				)

}