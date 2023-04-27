import { useState, useEffect, useContext } from 'react';

import { Form, Button, Row, Col, Container} from 'react-bootstrap';
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

        fetch(`${process.env.REACT_APP_API_URL}/users/login`,
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
        			text: "Welcome!"
        		});
        	} else {

        		Swal.fire({
        			title: "Authentication Failed",
        			icon: "error",
        			text: "Check your login credentials and try again."

        		});
        	}
        });

        setEmail('');
        setPassword('');

        // alert(`${email} has been verified! Welcome back!`);
    }

    const retrieveUserDetails = (token) => {
    	// The token will be sent as part of the request's header information
    	// We put "Bearer" in front of the token to follow implementation standards for JWTs
    	fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
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
    			isAdmin: data.isAdmin,
    			firstName: data.firstName
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
    		<Navigate to="/"/>
    	:
    	<Container className="vh-100">
	    	<Row className="my-auto d-flex justify-content-center">
		    	<Col className="my-5 mx-auto py-3
		    		order-2 order-sm-2 order-md-1 order-lg-1 order-xl-1
		    		col-12 col-sm-10 col-md-5 col-lg-5
		    	">
			    	<div className="mx-auto col-10">
			    		<h1 className="text-light">Login</h1>
					    <Form onSubmit={e => authenticate(e)}>
					        <Form.Group className="mb-3" controlId="userEmail">
					            <Form.Label className="text-light" >Email address</Form.Label>
					            <Form.Control 
					                type="email" 
					                placeholder="Enter email"
					                value={email}
					    			onChange={(e) => setEmail(e.target.value)}
					                required
					            />
					        </Form.Group>

					        <Form.Group className="mb-3" controlId="password">
					            <Form.Label className="text-light">Password</Form.Label>
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
					</div>
				</Col>
				<Col className="my-auto py-1 px-5 
					order-1 order-sm-1 order-md-2 order-lg-2 order-xl-2
					col-12 col-sm-10 col-md-5 col-lg-5">
					<h2 className="text-light">Hi there! <br/> Please login and check our available products you truly deserve.</h2>
					<h4 className="text-light">Enjoy shopping with just few clicks away.</h4> 
				</Col>
			</Row>
		</Container>
	)
}
