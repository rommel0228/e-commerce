import { Link } from 'react-router-dom';

import {Row, Col, Card, Button} from 'react-bootstrap';

export default function ProductCard({product}){

	const { _id, name, description, price } = product;
	return (
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
                <Link className="btn btn-primary" to={`/courses/${_id}`}>Details</Link>
            </Card.Body>
			</Card>
			</a>
		</Col>
	)
}
