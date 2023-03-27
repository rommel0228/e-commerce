import { useState, useEffect, useContext } from 'react';
import { Form, Button, Accordion } from 'react-bootstrap';
import { Navigate,  useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';


export default function CreateNewProduct() {

	const { user } = useContext(UserContext);
	const navigate = useNavigate();

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
		        price: price,
		        stocks: stocks,
		        image: image
		    })
	})
	.then(res => res.json())
	.then(data => {
		console.log(data);

		if (data === true) {

	                    // Clear input fields
	                    setName('');
	                    setDescription('');
	                    setPrice('');
	                    setStocks('');
	                    setImage('')

	                    Swal.fire({
	                        title: 'Success',
	                        icon: 'success',
	                        text: 'You have successfully added new product'
	                    });

	                    // Allows us to redirect the user to the login page after registering for an account
	                    navigate("/products/dashboard");

	                } else {

	                    Swal.fire({
	                        title: 'Something wrong',
	                        icon: 'error',
	                        text: 'Please try again.'   
	                    });
	                }

	})



	}


	useEffect(() => {
	if((name !== '' && 
		description !== '' && 
		price !== '' &&
		stocks !=='' &&
		image !=''
		)) {
			setIsActive(true);
	} else {
			setIsActive(false);
	}
	}, [name, description, price, stocks, image]);
	return (
		(user.id !== null && user.isAdmin === true) ?
		<Accordion  defaultActiveKey="1">
		      <Accordion.Item  eventKey="0">
		        <Accordion.Header>Add New Product</Accordion.Header>
		        <Accordion.Body className="newProd p-4">
		<div>
		<Form onSubmit={(e) => addProduct(e)}>
			<Form.Group className="mb-3" controlId="name">
			    <Form.Label>Product Name</Form.Label>
			    <Form.Control className="input-bg"
			        type="text" 
			        placeholder="Enter product name"
			        value={name} 
			        onChange={e => setName(e.target.value)}
			        required
			    />
			</Form.Group>

			<Form.Group className="mb-3" controlId="description">
			    <Form.Label>Product Description</Form.Label>
			    <Form.Control className="input-bg"
			    	as="textarea"
			        type="text" 
			        placeholder="Enter Product Description"
			        value={ description } 
			        onChange={e => setDescription(e.target.value)}
			        required
			    />
			</Form.Group>

	      <Form.Group className="mb-3" controlId="price">
	        <Form.Label>Product Price</Form.Label>
	        <Form.Control className="input-bg"
	        	type="number" 
	        	placeholder="Enter product price"
	        	value={ price }
	        	onChange={e => setPrice(e.target.value)}
	        	required/>
	      </Form.Group>

	      <Form.Group className="mb-3" controlId="price">
	      <Form.Label>Stocks</Form.Label>
	      <Form.Control className="input-bg"
	        	type="number" 
	        	placeholder="Enter available stocks"
	        	value={ stocks }
	        	onChange={e => setStocks(e.target.value)}
	        	required/>
	      </Form.Group>

	      <Form.Group className="mb-3" controlId="price">
	      <Form.Label>Image</Form.Label>
	      <Form.Control className="input-bg"
	        	type="text" 
	        	placeholder="Input a valid image url"
	        	value={ image }
	        	onChange={e => setImage(e.target.value)}
	        	required/>
	      </Form.Group>

	      { isActive ?
	  			<Button variant="primary" type="submit" id="submitBtn">
	  			  Add Product
	  			</Button>
	  			:
	  			<Button variant="danger" type="submit" id="submitBtn" disabled>
	  			  Add Product
	  			</Button>
	  		}
	    </Form>
	    </div>
	      </Accordion.Body>
      </Accordion.Item>
      </Accordion>
	    :
	    <></>

	)
}