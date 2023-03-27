import { useContext } from 'react';

import { Container, Navbar, Nav } from "react-bootstrap";
import { Link, NavLink } from 'react-router-dom';

import UserContext from '../UserContext';

export default function AppNavbarNotAdmin(){

	const { user } = useContext(UserContext);

	return (

		<Navbar expand="lg">
			<Container fluid>
				
					{(user.id !== null) ?
					<div className="d-flex flex-column">
					<Navbar.Brand className="text-light" as={ Link } to="/"><strong>Technorama</strong></Navbar.Brand>
					<p className="my-auto text-light">Welcome back, {user.firstName}!</p>
					</div>
					:
					<Navbar.Brand className="text-light" as={ Link } to="/"><strong>Technorama</strong></Navbar.Brand>

					}
				
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<Nav.Link className="text-light" as={ NavLink } to="/"><strong>Home</strong></Nav.Link>
						<Nav.Link className="text-light" as={ NavLink } to="/products"><strong>Product Catalog</strong></Nav.Link>

						{ (user.id !== null) ?
							<>
								<Nav.Link as={ NavLink } to="/cart">
									<img className="cartIcon" src="https://www.rawshorts.com/freeicons/wp-content/uploads/2017/01/orange_shoppictcart_1484336529.png" />
								</Nav.Link>	
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
			</Container>
		</Navbar>
	)
}
