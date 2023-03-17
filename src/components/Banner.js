//Bootstrap grid system components row, col
import {Button, Row, Col} from 'react-bootstrap';


export default function Banner() {
	const links = ["/", "/logout", "/courses","register","/login"]

	let isFound = links.find(window.location.pathname);
	console.log(isFound);

	// return (
	
	// 			// { (isFound)?
	// 			// <>
	// 			// <Row>
	// 			// 	<Col className = "p-5">
	// 			// 	 	<h1> Zuitt Coding Bootcamp </h1>
	// 			// 	 	<p>Opportunities for everyone, everywhere. </p>
	// 			// 	 	<Button variant="primary"> Enroll Now! </Button>
	// 			// 	</Col>
	// 			// </Row>

	// 			// </>
	// 			// :
	// 			// <>
	// 			// <p>error</p>
	// 			// </>	
	// 			// }
			 	
	// );
}