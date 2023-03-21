import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';

export default function Logout() {

	// Consume the UserContext object and destructure it to access the user state and unsetUser function from the context provider
	const { unsetUser, setUser } = useContext(UserContext);

	// Clear the localStorage of the user's information
	unsetUser();

	// localStorage.clear(); -- already implemented in App.js

	useEffect(() => {

		setUser({id: null})
	});

	// Redirect back to login
	return(
		<Navigate to='/login'/>
	)
}