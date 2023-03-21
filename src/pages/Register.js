import {useState, useEffect, useContext} from 'react';
import {Form, Button} from 'react-bootstrap';

import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import UserContext from "../UserContext"



export default function Register(){
	const { user, setUser } = useContext(UserContext);
	const [ email, setEmail ] = useState('');
	const [ password1, setPassword1 ] = useState('');
	const [ password2, setPassword2 ] = useState('');
	const [ firstName, setFirstName ] = useState('');
	const [ lastName, setLastName ] = useState('');
	const [ mobileNo, setMobileNo ] = useState('');

	const [isActive, setIsActive] = useState(false);

	function registerUser(e) {
		e.preventDefault();
		fetch('http://localhost:4000/users/checkEmail',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
			    email: email
			})
		})
		.then(res => res.json())
		.then(data => {
			if (data === false) {
				fetch('http://localhost:4000/users/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					firstName: firstName,
					lastName: lastName,
				    email: email,
				    mobileNo: mobileNo,
				    password: password1
				})
			})
				Swal.fire({
				title: "Registration Successful",
				icon: "success",
				text: "Welcome!!!"
			})
				.then(function() {
    			window.location = "http://localhost:3000/login";
    			})
			} else if (data === true) {
				Swal.fire({
					title: "Duplicate email found",
					icon: "error",
					text: "Please provide a different email"
				})
				.then(function() {
    			window.location = "http://localhost:3000/login";
    			});
			}
		})

		setEmail('');
		setPassword1('');
		setPassword2('');
		setFirstName('')
		setLastName('')
		setMobileNo('')
	};

	useEffect(() => {

		if((email !== '' && password1 !== '' && password2 !== '' && !(firstName.length < 11) && !(lastName.length < 11) && !(mobileNo.length < 11)) && (password1 === password2)) {
			setIsActive(true);
		} else {
			setIsActive(false);
		}
	}, [email, password1, password2, firstName , lastName, mobileNo]);
	return(
		<>
 	{/*	<Navigate to="/login"/>*/}
 		
		<Form onSubmit={(e) => registerUser(e)}>
	      <Form.Group className="mb-3" controlId="userFirstName">
	      	<Form.Label>First Name</Form.Label>
	        <Form.Control 
	        	type="text" 
	        	placeholder="Enter First Name" 
	        	value={ firstName }
	        	onChange= {e => setFirstName(e.target.value)}
	        	required/>
	      </Form.Group>

	      <Form.Group className="mb-3" controlId="userLastName">
	      <Form.Label>Last Name</Form.Label>
	        <Form.Control 
	        	type="text" 
	        	placeholder="Enter Last Name" 
	        	value={ lastName }
	        	onChange= {e => setLastName(e.target.value)}
	        	required/>
	      </Form.Group>

		  <Form.Group className="mb-3" controlId="userEmail">
	        <Form.Label>Email address</Form.Label>
	        <Form.Control 
	        	type="email" 
	        	placeholder="Enter email" 
	        	value={ email }
	        	onChange= {e => setEmail(e.target.value)}
	        	required/>
	        <Form.Text className="text-muted">
	          We'll never share your email with anyone else.
	        </Form.Text>
	      </Form.Group>

		  <Form.Group className="mb-3" controlId="userMobileNo">
	        <Form.Label>Mobile Number</Form.Label>
	        <Form.Control 
	        	type="text" 
	        	placeholder="Enter email" 
	        	value={ mobileNo }
	        	onChange= {e => setMobileNo(e.target.value)}
	        	required/>
	      </Form.Group>	      

	      <Form.Group className="mb-3" controlId="password1">
	        <Form.Label>Password</Form.Label>
	        <Form.Control 
	        	type="password" 
	        	placeholder="Password" 
	        	value={ password1 }
	        	onChange= {e => setPassword1(e.target.value)}
	        	required/>
	      </Form.Group>

	      <Form.Group className="mb-3" controlId="password2">
	        <Form.Label>Password</Form.Label>
	        <Form.Control 
	        	type="password" 
	        	placeholder="Password" 
	        	value={ password2 }
	        	onChange= {e => setPassword2(e.target.value)}
	        	required/>
	      </Form.Group>


	{/*      <Form.Group className="mb-3" controlId="formBasicCheckbox">
	        <Form.Check type="checkbox" label="Check me out" />
	      </Form.Group>*/}
	      {isActive ?
	            <Button variant="primary" type="submit" id="submitBtn">
	        Submit
	      </Button>
	      :
	       <Button variant="danger" type="submit" id="submitBtn" disabled>
	        Submit
	      </Button>
	  	}
    </Form>
    </>
    )
}