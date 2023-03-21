import { useState, useEffect, useContext } from 'react';

import { Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import UserContext from '../UserContext';

export default function Login() {

	// Allows us to consume the User context object and it's properties to use for user validation 
	const { user, setUser } = useContext(UserContext);

	// State hooks to store the values of the input fields
	const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // State to determine whether submit button is enabled or not
    const [isActive, setIsActive] = useState(true);

	function authenticate(e) {

        // Prevents page redirection via form submission
        e.preventDefault();

        // Process a fetch request to the corresponding backend API
        // The header information "Content-Type" is used to specify that the information being sent to the backend will be sent in the form of JSON
        // The fetch request will communicate with our backend application providing it with a stringified JSON
        // Convert the information retrieved from the backend into a JavaScript object using the ".then(res => res.json())"
        // Capture the converted data and using the ".then(data => {})"
        // Syntax
            // fetch('url', {options})
            // .then(res => res.json())
            // .then(data => {})
        fetch('http://localhost:4000/users/login',
        {
        	method: 'POST',
        	headers: {
        		'Content-Type': 'application/json'
        	},
        	body: JSON.stringify({
        		email: email,
        		password: password
        	})
        })
        .then(res => res.json())
        .then(data => {

        	// It is good practice to always print out the result of our fetch request to ensure that the correct information is received in our frontend application
        	console.log(data);

        	// If no user information is found, the "access" property will not be available and will return undefined
        	// Using the typeof operator will return a string of the data type of the variable/expression it preceeds which is why the value being compared is in a string data type
        	if(typeof data.access !== "undefined"){

        		// The JWT will be used to retrieve user information across the the whole frontend application and storing it in the localStorage will allow ease of access to the user's information
        		localStorage.setItem('token', data.access);
        		retrieveUserDetails(data.access);

        		// Implement sweetalert2 for login page and add condition
        		Swal.fire({
        			title: "Login Successful",
        			icon: "success",
        			text: "Welcome to Zuitt!"
        		});
        	} else {

        		Swal.fire({
        			title: "Authentication Failed",
        			icon: "error",
        			text: "Check your login credentials and try again."
        		});
        	}
        });

        // Set the email of the authenticated user in the local storage
        // Syntax
        	// localStorage.setItem('propertyName', value);
        // Storing information in the localStorage will make the data persistent even as the page is refreshed unlike with the use of states where the information is reset when refreshing the page
        // localStorage.setItem('email', email) -- implementeed as jwt

        // Set the global user state to have properties obtained from local storage
        // Though access to the user information can be done via the localStorage this is necessary to update the user state which will help update the App component and rerender it to avoid refreshing the page upon user login and logout
        // When states change components are rerendered and the AppNavbar component will be updated based on the user credentials, unlike when using the localStorage where the localStorage does not trigger component rerendering
        // setUser({ email: localStorage.getItem('email')})

        // Clear input fields after submission
        setEmail('');
        setPassword('');

        // alert(`${email} has been verified! Welcome back!`);
    }

    const retrieveUserDetails = (token) => {


    	// The token will be sent as part of the request's header information
    	// We put "Bearer" in front of the token to follow implementation standards for JWTs
    	fetch('http://localhost:4000/users/details', {
    		headers: {
    			Authorization: `Bearer ${ token }`
    		}
    	})
    	.then(res => res.json())
    	.then(data => {

    		console.log(data);

    		// Changes the global "user" state to store the "id" and the "isAdmin" property of the user which will be used for validation across the whole application
    		setUser({
    			id: data._id,
    			isAdmin: data.isAdmin
    		})
    	})
    };



	useEffect(() => {

        // Validation to enable submit button when all fields are populated and both passwords match
        if(email !== '' && password !== ''){
            setIsActive(true);
        }else{
            setIsActive(false);
        }

    }, [email, password]);

    return (

    	(user.id !== null) ?
    		<Navigate to="/courses"/>
    	:
		    <Form onSubmit={e => authenticate(e)}>
		        <Form.Group className="mb-3" controlId="userEmail">
		            <Form.Label>Email address</Form.Label>
		            <Form.Control 
		                type="email" 
		                placeholder="Enter email"
		                value={email}
		    			onChange={(e) => setEmail(e.target.value)}
		                required
		            />
		        </Form.Group>

		        <Form.Group className="mb-3" controlId="password">
		            <Form.Label>Password</Form.Label>
		            <Form.Control 
		                type="password" 
		                placeholder="Password"
		                value={password}
		    			onChange={(e) => setPassword(e.target.value)}
		                required
		            />
		        </Form.Group>

		        { isActive ? 
		            <Button variant="success" type="submit" id="submitBtn">
		                Submit
		            </Button>
		            : 
		            <Button variant="danger" type="submit" id="submitBtn" disabled>
		                Submit
		            </Button>
		        }
		    </Form>
	)
}