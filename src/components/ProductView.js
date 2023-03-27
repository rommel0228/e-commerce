

import { useState, useEffect, useContext } from 'react';
import { Container, Form, Card, Button, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function ProductView() {

	// The "useParams" hook allows us to retrieve the courseId passed via the URL
	const { productId } = useParams();

	const { user } = useContext(UserContext);

	// Allows us to gain access to methods that will allow us to redirect a user to a different page after enrolling a course
	//an object with methods to redirect the user
	const navigate = useNavigate();

	const [ name, setName ] = useState()
	const [ description, setDescription ] = useState();
	const [ price , setPrice ] = useState(0);
	const [ quantity , setQuantity ] = useState(3);
	const [ stocks, setStocks] = useState();
	const [ totalAmount, setTotalAmount ] = useState();
	const [ image, setImage] = useState()
	const [ isActive, setIsActive ] = useState(false);

	function editProduct(e) {
			e.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`, {
			    method: "PUT",
			    headers: {
			        'Content-Type': 'application/json'
			    },
			    body: JSON.stringify({
			        name: name,
			        description: description,
			        price: price,
			        image: image,
			        stocks: stocks

			    })
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);


			if (data === true) {

				Swal.fire({
					title: "Successful",
					icon: 'success',
					text: "You have successfully edited this product."
				});

				// The navigate hook will allow us to navigate and redirect the user back to the courses page programmatically instead of using a component.
				navigate("/products/dashboard");

			} else {

				Swal.fire({
					title: "Something went wrong",
					icon: "error",
					text: "Please try again."
				});
			}
		});
	}

	useEffect(() => {

		console.log(productId);

		fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
		.then(res => res.json())
		.then(data => {

			console.log(data);

			setName(data.name);
			setDescription(data.description);
			setPrice(data.price);
			setStocks(data.stocks);
			setImage(data.image)
		})

	}, [ productId ]);

	useEffect(() => {
	if((name !== '' && 
		description !== '' && 
		price !== ''
		)) {
			setIsActive(true);
	} else {
			setIsActive(false);
	}
	}, [name, description, price]);

	function addToCart(e) {

		fetch(`${process.env.REACT_APP_API_URL}/orders/createOrder`, {
			    method: "POST",
			    headers: {
			        'Content-Type': 'application/json'
			    },
			    body: JSON.stringify({
			        userId: user.id,
			        productId: productId,
			        price: price,
			        quantity: quantity,
			        totalAmount: price*quantity
			    })
		})
		.then(res => res.json())
		.then(data => {

            console.log(data);

            if (data === true) {
                Swal.fire({
                    title: 'Registration successful',
                    icon: 'success',
                    text: 'Welcome to Zuitt!'
                });

            } else {

                Swal.fire({
                    title: 'Something wrong',
                    icon: 'error',
                    text: 'Please try again.'   
                });
            }

		});
	}

	return (

		(user.id !== null && user.isAdmin === true) ?
		<div className="vh-100">
		<h1 className="text-center mt-5 text-light">Edit/Update A Product</h1>

		<Form className="mx-auto col-8 mb-3" onSubmit={(e) => editProduct(e)}>
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
	        	value={ price }
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
	    </div>
	    :
	    // Will only be display if the user is not an admin
	    <div className="vh-100 text-center">
	    <Col className="mx-auto productCard p-2">
			<Card style={{width: '18rem', height: "25rem" }}>
			    <Card.Img className="productImage" variant="top" src={image}/>
			    <Card.Body>
                	<Card.Title>{ name }</Card.Title>
                	<Card.Subtitle>Description:</Card.Subtitle>
                	<Card.Text>{ description }</Card.Text>
                	<div className="d-flex mb-3">
                		<Card.Subtitle className="mx-auto">Price: Php { price }</Card.Subtitle>
                		<Card.Subtitle className="mx-auto">Stocks:{ stocks }</Card.Subtitle>
                	</div>
                	{(user.id !== null)?
                		<>
                		<Button className="mx-2 btn-success">Checkout</Button>
                		<Button className="mx-2 btn-success" onClick={e => addToCart(productId)}>Add to cart</Button>
                		</>
                		:
                		<>
                		<Button as={Link} className="mx-2 btn-success" to="/login">Login</Button>
                		</>

                	}
            </Card.Body>
			</Card>
		</Col>
		</div>
	)

}