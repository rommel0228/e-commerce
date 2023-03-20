import { useState , useEffect } from 'react';


import PropTypes from 'prop-types';
import {Row, Col, Card, Button} from 'react-bootstrap';

export default function ProductCard({product}){

	return (
		<Col className="productCard p-2">
			<a className="clickableProdCard" href="#"> 
			<Card id="productCardItem"style={{width: '18rem', height: "25rem" }}>
			      <Card.Img className="productImage" variant="top" src={product.image}/>
			      <Card.Body>
			        <Card.Title>{product.name}</Card.Title>
			        <div>
			      	  	<Card.Text>PHP {product.price}</Card.Text>
			        	<Card.Text>44.5 sold</Card.Text>
			        </div>
			        <Button variant="secondary">Add to cart</Button>
			        <Button variant="secondary">Add to wishlist</Button>
			      </Card.Body>
			</Card>
			</a>
		</Col>
	)
}