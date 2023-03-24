

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
	const [ description, setDescription ] = useState("");
	const [ price , setPrice ] = useState(0);
	const [isActive, setIsActive] = useState(false);

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
			        price: price
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

		fetch(`http://localhost:4000/products/${productId}`)
		.then(res => res.json())
		.then(data => {

			console.log(data);

			setName(data.name);
			setDescription(data.description);
			setPrice(data.price);
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

	return (

		(user.id !== null && user.isAdmin === true) ?
		<Form onSubmit={(e) => editProduct(e)}>
			<Form.Group controlId="name">
			    <Form.Label>Product Name</Form.Label>
			    <Form.Control 
			        type="text" 
			        placeholder="Hello"
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
			        placeholder="Hello"
			        value={ description } 
			        onChange={e => setDescription(e.target.value)}
			        required
			    />
			</Form.Group>

	      <Form.Group className="mb-3" controlId="price">
	        <Form.Label>Product Price</Form.Label>
	        <Form.Control 
	        	type="number" 
	        	placeholder= "Hello"
	        	value={ price }
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
	    <Col className="productCard p-2">
			<a className="clickableProdCard" href="#"> 
			<Card id="productCardItem"style={{width: '18rem', height: "25rem" }}>
			      <Card.Img className="productImage" variant="top" src="https://th.bing.com/th/id/R.59d088aed8128144d04ae33c39d5651b?rik=S3bII65P3pcbmg&riu=http%3a%2f%2fcdn.playbuzz.com%2fcdn%2ff5f49f57-ad67-4272-b0f7-9aeb9f9e707e%2f2a28b81f-e697-437c-82b4-ddbfc8a6418c.jpg&ehk=kqtOlg6e%2bmzEB6fGrBcdGnpVnHgne3JpMtR18x6%2fhkY%3d&risl=&pid=ImgRaw&r=0"/>
			      <Card.Body>
                <Card.Title>{ name }</Card.Title>
                <Card.Subtitle>Description:</Card.Subtitle>
                <Card.Text>{ description }</Card.Text>
                <Card.Subtitle>Price:</Card.Subtitle>
                <Card.Text>{ price }</Card.Text>
            </Card.Body>
			</Card>
			</a>
		</Col>


		/*<Container className="mt-5">
			<Row>
				<Col lg={{ span: 5, offset: 3}}>
					<Card className="my-3">
					    <Card.Body>
					        <Card.Title>{ name }</Card.Title>
					        <Card.Subtitle>Description:</Card.Subtitle>
					        <Card.Text>{ description }</Card.Text>
					        <Card.Subtitle>Price:</Card.Subtitle>
					        <Card.Text>Php { price }</Card.Text>
					        <Card.Subtitle>Class Schedule</Card.Subtitle>
					        <Card.Text>8 am - 5 pm</Card.Text>
					        { user.id !== null ? 
					        		<Button variant="primary" block onClick={() => enroll(productId)}>Enroll</Button>
					        	: 
					        		<Link className="btn btn-danger btn-block" to="/login">Log in to Enroll</Link>
					        }
					    </Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>*/
	)

}