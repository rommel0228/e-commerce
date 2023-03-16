// AppNavbar.js - components should be in Pascal Case

//React bootstrap compponents
/*
	import moduleName from "filePath"
*/

//One way to import a module name
// import Container from "react-bootstrap/Container";
//alternative way
import { Container, Navbar, Nav} from "react-bootstrap";
export default function AppNavbar() {
	return (

		<Navbar bg="light" exapand = "lg">
			<Container fluid>
				<Navbar.Brand href ="#home"> Zuitt Booking </Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav"/>
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className = "mr-auto">
						<Nav.Link href ="#home">Home</Nav.Link>
						<Nav.Link href ="#link">Courses</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}