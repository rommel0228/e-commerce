import { useState , useEffect } from 'react';

import PropTypes from 'prop-types';
import {Row, Col, Card, Button} from 'react-bootstrap';


export default function CourseCard({course}) {
	// console.log(props);
	// console.log(typeof props);

	const [count, setCount] = useState(0);
	const [seats, setSeats] = useState(30)



	function enroll() {
		if(seats > 0) {
			setCount(count +1);
			setSeats(seats -1);
			console.log("Available seats:" + seats);
			console.log("Enrollees:" + count);
		}else{
			alert("No more seats available")
		}
	};
	
	useEffect(() => {
		if( seats === 0) {
			setSeats(false);
		}
	}, [seats]);



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
