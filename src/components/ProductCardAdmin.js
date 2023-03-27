import { useState, useEffect, useContext } from 'react';
import { Container, Form, Card, Button, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';


export default function ProductCardAdmin({product}){

	const { user } = useContext(UserContext);

	const { _id, name, description, price, stocks, image } = product;

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
			<Card id="productCardItem" style={{width: '18rem', height: "28rem" }}>
			      <Card.Img className="productImage" variant="top" src={image}/>
			      <Card.Body>
                <Card.Title>{ name }</Card.Title>
                <Card.Text>{ description }</Card.Text>
                <div className="d-flex mx-1 px-3">
                	<Col>
                	<p>Php{ price }</p>
                	</Col>
                	<Col>
                	<p>Stocks: { stocks }</p>
                	</Col>
                </div>
                <div className="d-flex justify-content-center">
                	<Link className="mx-2" to={`/products/${_id}`}>
                		<Button variant="success" className="push" > Edit</Button>
                	</Link>
             		{(product.isActive === false)?
             		<div className="mx-2">
                		<Button variant="success" className="push" onClick={(e) => activateProduct(_id)}>Activate</Button>
                	</div>
                	:
                	<div className="mx-2">
               		 	<Button variant="success" className="push" onClick={(e) => archiveProduct(_id)}>Archive</Button>
               		</div>
            		}
            		<Link className="mx-2" to={`/products/${_id}`}>
                		<Button variant="success" className="push">Delete</Button>
                	</Link>
            	</div>
            </Card.Body>
			</Card>
			</a>
		</Col>

	:
	<p>You dont have access to this page </p>

	
	)
}
