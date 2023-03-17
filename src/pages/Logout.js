import { Navigate } from 'react-router-dom';

export default function Logout() {
	localStorage.clear();

	//Redirect back to login

	return
		<Navigate to='/login' />
}