// AppNavbar.js - components should be in Pascal Case

//React bootstrap compponents
/*
	import moduleName from "filePath"
*/

//One way to import a module name
// import Container from "react-bootstrap/Container";
//alternative way
import { useState } from 'react';
import { Container, Navbar, Nav} from "react-bootstrap";
import { Link, NavLink } from 'react-router-dom';

export default function AppNavbar() {

	const [user, setUser] = useState(localStorage.getItem("email"));
	console.log(user);

	return (
		<Navbar bg="light" exapand = "lg">
			<Container fluid>
				<Navbar.Brand as={ Link} to="/"> Zuitt Booking </Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav"/>
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className = "ms-auto">
						<Nav.Link as={ NavLink } to = "/">Home</Nav.Link>
						<Nav.Link as={ NavLink} to="/courses">Courses</Nav.Link>
						{ (user !== null) ?
							<Nav.Link as={ NavLink} to="/logout">Logout</Nav.Link>
							:
							<>
								<Nav.Link as={ NavLink } to="/login">Login</Nav.Link>
								<Nav.Link as={ NavLink } to="/register">Register</Nav.Link>
							</>
						}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}