import { useContext } from 'react';

import { Container, Navbar, Nav } from "react-bootstrap";
import { Link, NavLink } from 'react-router-dom';

import UserContext from '../UserContext';

export default function AppNavbarAdmin(){
	
	const { user } = useContext(UserContext);

	return (

		<Navbar expand="lg">
			<Container fluid>
				<div className="d-flex flex-column">
				<Navbar.Brand className="text-light" as={ Link } to="/"><strong>Technorama</strong></Navbar.Brand>
				<p className="my-auto text-light">Welcome back, {user.firstName}!</p>
				</div>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
					{/*The "as" prop allows components to be treated as if they are a different component gaining access to it's properties and functionalities.*/}
						<Nav.Link className="text-light" as={ NavLink } to="/"><strong>Home</strong></Nav.Link>
						{/*- The "to" prop is used in place of the "href" prop for providing the URL for the page.*/}
						{/*For capstone*/}
						<Nav.Link className="text-light" as={ NavLink } to="/products/dashboard"><strong>Admin Dashboard</strong></Nav.Link>

						{ (user.id !== null) ?
							<><Nav.Link className="text-light" as={ NavLink } to="/logout"><strong>Logout</strong></Nav.Link>
							{/*When clicked, should redirect to checkout page which contains the list of products from users checkout array*/}
							</>
							:
							<>
								<Nav.Link className="text-light" as={ NavLink } to="/login"><strong>Login</strong></Nav.Link>
								<Nav.Link className="text-light" as={ NavLink } to="/register"><strong>Register</strong></Nav.Link>
							</>
						}
									
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}
