import { Link } from 'react-router-dom';

import {Row, Col, Card, Button} from 'react-bootstrap';

export default function ProductCard({product}){

	const { _id, name, description, price, image, stocks } = product;
	return (
		<Col className="productCard px-2"> 
			<Card id="productCardItem" style={{width: '18rem', height: "28rem" }}>
			    <Card.Img className="productImage" variant="top" src={image}/>
			    <Card.Body>
                	<Card.Title>{ name }</Card.Title>
                	<div className="d-flex my-3">
                	<Col>
                	<Card.Subtitle>Price: { price }</Card.Subtitle>
                	</Col>
                	<Col>
                	<Card.Subtitle>Stocks: {stocks}</Card.Subtitle>
                	</Col>
                	</div>
                <Link className="btn btn-warning" to={`/products/${_id}`}>Details</Link>
            </Card.Body>
			</Card>
		</Col>
	)
}
