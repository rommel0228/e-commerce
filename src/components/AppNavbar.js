// React Bootstrap Components
/*
	import moduleName from "filePath"
*/
// import Container from "react-bootstrap/Container";
// import { useState } from 'react';
import { useContext } from 'react';

import { Container, Navbar, Nav } from "react-bootstrap";
import { Link, NavLink } from 'react-router-dom';

import AppNavbarAdmin from './AppNavbarAdmin'
import AppNavbarNotAdmin from './AppNavbarNotAdmin'
import UserContext from '../UserContext';

export default function AppNavbar(){

	// State to store the user information stored in the login page.
	// const [user, setUser] = useState(localStorage.getItem('email'));
	// console.log(user);

	const { user } = useContext(UserContext);

	//Condition that allows makes AppNavbar features different according to user roles
	return (
		(user.isAdmin === true) ?
			<AppNavbarAdmin/>

		:
			<AppNavbarNotAdmin />
	)
}
