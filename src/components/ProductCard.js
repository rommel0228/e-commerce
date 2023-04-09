import { Link } from 'react-router-dom';

import {Row, Col, Card, Button} from 'react-bootstrap';

export default function ProductCard({product}){

	const { _id, name, description, price, image, stocks } = product;
	return (
		<Col className="productCard px-2 mt-2">
			<Card id="productCardItem" style={{width: '13rem', height: "18rem" }}>
			    <Card.Img className="productImage" variant="top" src={image}/>
			    <Card.Body className="d-flex flex-column mx-auto">
                	<Card.Subtitle className="container-fluid" id="title">{ name }</Card.Subtitle>
                	<Card.Subtitle className="" id="price">Php { price }</Card.Subtitle>
                	<Link className="btn btn-warning container-fluid" id="details" to={`/products/${_id}`}>View Details</Link>
            	</Card.Body>
			</Card>
		</Col>
	)
}
