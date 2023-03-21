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

export default function AppNavbar(){

	// State to store the user information stored in the login page.
	// const [user, setUser] = useState(localStorage.getItem('email'));
	// console.log(user);

	const { user } = useContext(UserContext);

	return (
		<Navbar bg="light" expand="lg">
			<Container fluid>
				<Navbar.Brand as={ Link } to="/">Zuitt Booking</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
					{/*The "as" prop allows components to be treated as if they are a different component gaining access to it's properties and functionalities.*/}
						<Nav.Link as={ NavLink } to="/">Home</Nav.Link>
						{/*- The "to" prop is used in place of the "href" prop for providing the URL for the page.*/}
						<Nav.Link as={ NavLink } to="/courses">Courses</Nav.Link>

						{/*For capstone*/}
						<Nav.Link as={ NavLink } to="/products">Products</Nav.Link>

						{ (user.id !== null) ?
							<><Nav.Link as={ NavLink } to="/logout">Logout</Nav.Link>
							{/*When clicked, should redirect to checkout page which contains the list of products from users checkout array*/}
						<Nav.Link as={ NavLink } to="/cart">
							<img className="cartIcon" src="https://www.rawshorts.com/freeicons/wp-content/uploads/2017/01/orange_shoppictcart_1484336529.png" />
						</Nav.Link>	</>
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
