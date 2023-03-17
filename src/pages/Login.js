import {useState, useEffect} from 'react';
import {Form, Button} from 'react-bootstrap';

export default function Login(){
	const [email, setEmail] = useState('');
	const [password1, setPassword1] = useState('');
	const [isActive, setIsActive] = useState(false);

	console.log(email);
	console.log(password1);

	function authenticate(e) {
		e.preventDefault();

		localStorage.setItem("email", email)

		setEmail('');
		setPassword1('');

		alert("You are now login")
	};

	useEffect(() => {

		if(email !== '' && password1 !== '') {
			setIsActive(true);
		} else {
			setIsActive(false);
		}
	}, [email, password1]);

	return(
		<Form onSubmit={(e) => authenticate(e)}>
		 <h1>Login</h1>
	      <Form.Group className="mb-3" controlId="userEmail">
	        <Form.Label>Email address</Form.Label>
	        <Form.Control 
	        	type="email" 
	        	placeholder="Enter email" 
	        	value={ email }
	        	onChange= {e => setEmail(e.target.value)}
	        	required/>
	        <Form.Text className="text-muted">
	        </Form.Text>
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
	{/*      <Form.Group className="mb-3" controlId="formBasicCheckbox">
	        <Form.Check type="checkbox" label="Check me out" />
	      </Form.Group>*/}
	      {isActive ?
	            <Button variant="primary" type="submit" id="submitBtn">
	        Login
	      </Button>
	      :
	       <Button variant="danger" type="submit" id="submitBtn" disabled>
	        Login
	      </Button>
	  	}
    </Form>
    )

 }
