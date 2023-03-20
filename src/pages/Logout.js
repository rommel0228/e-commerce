import { useContext, useEffect } from 'react'

import { Navigate } from 'react-router-dom';

import UserContext from "../UserContext"

export default function Logout() {
	// localStorage.clear();
	//Redirect back to login
	// Consume the UserContext object and destructure it to access the user state and unsetUser function from the context provider
	const { unsetUser, setUser } = useContext(UserContext);

	unsetUser();

	useEffect(() => {
		setUser({email: null})
	});

	return(
		<Navigate to='/login' />
	)
}