// React Bootstrap Components
/*
	import moduleName from "filePath"
*/
// import Container from "react-bootstrap/Container";
// import { useState } from 'react';
import { useContext } from 'react';

import { Container, Navbar, Nav } from "react-bootstrap";
import { Link, NavLink } from 'react-router-dom';

import UserContext from '../UserContext';

export default function AppNavbarAdmin(){

	// State to store the user information stored in the login page.
	// const [user, setUser] = useState(localStorage.getItem('email'));
	// console.log(user);

	const { user } = useContext(UserContext);

	return (

		<Navbar bg="light" expand="lg">
			<Container fluid>
				<Navbar.Brand as={ Link } to="/">TechStop</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
					{/*The "as" prop allows components to be treated as if they are a different component gaining access to it's properties and functionalities.*/}
						<Nav.Link as={ NavLink } to="/">Home</Nav.Link>
						{/*- The "to" prop is used in place of the "href" prop for providing the URL for the page.*/}
						{/*For capstone*/}
						<Nav.Link as={ NavLink } to="/products/dashboard">Admin Dashboard</Nav.Link>

						{ (user.id !== null) ?
							<><Nav.Link as={ NavLink } to="/logout">Logout</Nav.Link>
							{/*When clicked, should redirect to checkout page which contains the list of products from users checkout array*/}
							</>
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