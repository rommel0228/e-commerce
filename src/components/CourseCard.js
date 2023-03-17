import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

import PropTypes from 'prop-types';
import {Row, Col, Card, Button} from 'react-bootstrap';


export default function CourseCard({course}) {
	// console.log(props);
	// console.log(typeof props);

	const [count, setCount] = useState(0);
	const [seat, setSeat] = useState(30)

	console.log(useState(0));


	// function enroll() {
	// 	setCount(count +1);
	// 	console.log(`Enrollees: ${count}`)
	// }

	function enroll() {
		let newCount = setCount(count +1);
		let newSeat = setSeat(seat -1);
		

		if (newSeat = 25) {
			const [show, setShow] = useState(true);
			return (
			      <Alert show={show} variant="success">
			              <Alert.Heading>local:3000 says</Alert.Heading>
			              <p>
			              No more seats
			              <hr />
			              <div className="d-flex justify-content-end">
			                <Button onClick={() => setShow(false)} variant="outline-success">
			                  Ok </Button>
			              </div>
			            </Alert>

			            {!show && <Button onClick={() => setShow(true)}>Show Alert</Button>}
		)};

		console.log(`Enrollees: ${count}`);
		console.log(`Available seats: ${seat}`);
	};
	
	return(
			<Card>
			    <Card.Body>
			        <Card.Title>{course.name}</Card.Title>
			        <Card.Subtitle>Description:</Card.Subtitle>
			        <Card.Text>{course.description}</Card.Text>
			        <Card.Subtitle>Price:</Card.Subtitle>
					<Card.Text>{course.price}</Card.Text>
			       	<Button variant="primary" onClick = {enroll}>Enroll</Button>
			    </Card.Body>
			</Card>
	)
}

// Check if the CourseCard component is getting the correct prop types
// Proptypes are used for validating information passed to a component and is a tool normally used to help developers ensure the correct information is passed from one component to the next
// CourseCard.PropTypes = { 
// 	// The "shape" method is used to check if a prop object conforms to a specific "shape"	
// 	course: PropTypes.shape({
// 		name: PropTypes.string.isRequired,
// 		description: PropTypes.string.isRequired,
// 		price: PropTypes.number.isRequired
// 	})
// };
