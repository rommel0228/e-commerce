import {Row, Col, Card, Button} from 'react-bootstrap';

export default function CourseCard() {
	return(
		<Row className = "mt-3 mb-3">
			<Col>
			<Card>
			    <Card.Body>
			        <Card.Title><h2>Sample Course</h2></Card.Title>
			        	<Card.Text>
			          	Description: <br />
			          	This is a sample course offering.
			       	 	</Card.Text>
			        	<Card.Text>
			        	Price: <br />
			          	PHP 40,000
			       	 	</Card.Text>
			       	<Button variant="primary">Enroll</Button>
			     </Card.Body>
			</Card>
			</Col>
		</Row>
	)
}