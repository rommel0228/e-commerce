import { useState, useEffect, useContext } from 'react';
import { Container, Form, Card, Button, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';


export default function ProductCardAdmin({product}){

	const { user } = useContext(UserContext);

	const { _id, name, description, price } = product;

	function activateProduct(e) {
	fetch(`${process.env.REACT_APP_API_URL}/products/${_id}/activate`, {
		    method: "PUT",
		    headers: {
		        'Content-Type': 'application/json'
		    },
		    body: JSON.stringify({
		        isActive: true
		    })
	})
	.then(res => res.json())
	.then(data => {
		console.log(data);

		if (data === true) {
					window.location.reload(true)
	                    Swal.fire({
	                        title: 'Success',
	                        icon: 'success',
	                        text: 'You have successfully activated a product'
	                    });

	                } else {

	                    Swal.fire({
	                        title: 'Something wrong',
	                        icon: 'error',
	                        text: 'Please try again.'   
	                    });
	                }

	})
	}

	function archiveProduct(e) {
	fetch(`${process.env.REACT_APP_API_URL}/products/${_id}/archive`, {
		    method: "PUT",
		    headers: {
		        'Content-Type': 'application/json'
		    },
		    body: JSON.stringify({
		        isActive: false
		    })
	})
	.then(res => res.json())
	.then(data => {
		console.log(data);

		if (data === true) {
			window.location.reload(true)
	                    Swal.fire({
	                        title: 'Success',
	                        icon: 'success',
	                        text: 'You have successfully archived a product'
	                    });

	                } else {

	                    Swal.fire({
	                        title: 'Something wrong',
	                        icon: 'error',
	                        text: 'Please try again.'   
	                    });
	                }

	})

	}
	return (
		(user.isAdmin === true) ?

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
                <Link className="btn btn-primary" to={`/products/${_id}`}> Edit Details</Link>

             	{(product.isActive === false)?
                <Button onClick={(e) => activateProduct(_id)}>Activate</Button>
                :
                <Button  onClick={(e) => archiveProduct(_id)}>Archive</Button>
            	}
            </Card.Body>
			</Card>
			</a>
		</Col>

	:
	<p>You dont have access to this page </p>

	
	)
}
