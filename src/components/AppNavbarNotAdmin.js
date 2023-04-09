import { useContext } from 'react';

import { Container, Navbar, Nav } from "react-bootstrap";
import { Link, NavLink } from 'react-router-dom';

import UserContext from '../UserContext';

export default function AppNavbarNotAdmin(){

	const { user } = useContext(UserContext);

	return (
		<Navbar expand="lg">
					{(user.id !== null) ?
					<div className="d-flex flex-column ">
					<Navbar.Brand className="text-light navbar-brand" as={ Link } to="/"><strong>Technorama</strong></Navbar.Brand>
					<span className="my-auto text-light welcome-user">Welcome back, {user.firstName}!</span>
					</div>
					:
					<Navbar.Brand className="text-light navbar-brand" as={ Link } to="/"><strong>Technorama</strong></Navbar.Brand>

					}
				
				<Navbar.Toggle aria-controls="basic-navbar-nav" className="burger-button" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<Nav.Link className="text-light" as={ NavLink } to="/"><strong>Home</strong></Nav.Link>
						<Nav.Link className="text-light" as={ NavLink } to="/products"><strong>Product Catalog</strong></Nav.Link>

						{ (user.id !== null) ?
							<>
								<Nav.Link className="text-light" as={ NavLink } to="/cart"><strong>My Cart</strong></Nav.Link>	
								<Nav.Link className="text-light" as={ NavLink } to="/logout"><strong>Logout</strong></Nav.Link>
								
							</>
							:
							<>
								<Nav.Link className="text-light" as={ NavLink } to="/login"><strong>Login</strong></Nav.Link>
								<Nav.Link className="text-light" as={ NavLink } to="/register"><strong>Register</strong></Nav.Link>
							</>
						}			
					</Nav>
				</Navbar.Collapse>
		</Navbar>
	)
}
