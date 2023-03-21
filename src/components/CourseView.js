import { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function CourseView() {

	// The "useParams" hook allows us to retrieve the courseId passed via the URL
	const { courseId } = useParams();

	const { user } = useContext(UserContext);

	// Allows us to gain access to methods that will allow us to redirect a user to a different page after enrolling a course
	//an object with methods to redirect the user
	const navigate = useNavigate();

	const [ name, setName ] = useState("");
	const [ description, setDescription ] = useState("");
	const [ price , setPrice ] = useState(0);

	const enroll = (courseId) => {
		fetch(`http://localhost:4000/users/enroll`,
		{
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				courseId: courseId
			})
		})
		.then(res => res.json())
		.then(data => {

			console.log(data);

			if (data === true) {

				Swal.fire({
					title: "Successfully enrolled",
					icon: 'success',
					text: "You have successfully enrolled for this course."
				});

				// The navigate hook will allow us to navigate and redirect the user back to the courses page programmatically instead of using a component.
				navigate("/courses");

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

		console.log(courseId);

		fetch(`http://localhost:4000/courses/${courseId}`)
		.then(res => res.json())
		.then(data => {

			console.log(data);

			setName(data.name);
			setDescription(data.description);
			setPrice(data.price);
		})

	}, [ courseId ]);

	return (

		<Container className="mt-5">
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
					        		<Button variant="primary" block onClick={() => enroll(courseId)}>Enroll</Button>
					        	: 
					        		<Link className="btn btn-danger btn-block" to="/login">Log in to Enroll</Link>
					        }
					    </Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	)

}