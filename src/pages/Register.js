import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate,  useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function Register(){

	const { user } = useContext(UserContext);
	const navigate = useNavigate();

	// State hooks to store the values of the input fields
	// getters are variables that store data (from setters)
	// setters are function that sets the data (for the getters)
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
/*	const [mobileNo, setMobileNo] = useState('');
*/	const [password1, setPassword1] = useState('');
	const [password2, setPassword2] = useState('');
	// State to determine whether submit button is enabled or not
	const [isActive, setIsActive] = useState(false);

	console.log(email);
	console.log(password1);
	console.log(password2);

	// Function to simulate user registration
	function registerUser(e) {
		// Prevents page redirection via form submission
		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/users/checkEmail`, {
		    method: "POST",
		    headers: {
		        'Content-Type': 'application/json'
		    },
		    body: JSON.stringify({
		        email: email
		    })
		})
		.then(res => res.json())
		.then(data => {

		    console.log(data);

		    if(data === true){

		    	Swal.fire({
		    		title: 'Duplicate email found',
		    		icon: 'error',
		    		text: 'Kindly provide another email to complete the registration.'	
		    	});
		    	// Allows us to redirect the user to the login page after registering for an account
		    	navigate("/login");

		    } else {

	            fetch(`${ process.env.REACT_APP_API_URL }/users/register`, {
	                method: "POST",
	                headers: {
	                    'Content-Type': 'application/json'
	                },
	                body: JSON.stringify({
	                    firstName: firstName,
	                    lastName: lastName,
	                    email: email,
	                    // mobileNo: mobileNo,
	                    password: password1
	                })
	            })
	            .then(res => res.json())
	            .then(data => {

	                console.log(data);

	                if (data === true) {

	                    // Clear input fields
	                    setFirstName('');
	                    setLastName('');
	                    setEmail('');
	                    // setMobileNo('');
	                    setPassword1('');
	                    setPassword2('');

	                    Swal.fire({
	                        title: 'Registration successful',
	                        icon: 'success',
	                        text: 'Welcome to Zuitt!'
	                    });

	                    // Allows us to redirect the user to the login page after registering for an account
	                    navigate("/login");

	                } else {

	                    Swal.fire({
	                        title: 'Something wrong',
	                        icon: 'error',
	                        text: 'Please try again.'   
	                    });
	                }

				});
	        }
	    })
	}

	useEffect(() => {

		if((email !== '' && 
			password1.length >= 8 && 
			password2 !== '' && 
			firstName !== '' && 
			lastName  !== '' && 
/*			!(mobileNo.length < 11)) && */
			(password1 === password2))) {
				setIsActive(true);
		} else {
				setIsActive(false);
		}
	}, [email, password1, password2, firstName , lastName]);
	
	return(

		(user.id !== null) ?
		    <Navigate to="/courses" />
		:
		// 2-way Binding (Bnding the user input states into their corresponding input fields via the onChange JSX Event Handler)
		<Form onSubmit={(e) => registerUser(e)}>
			<Form.Group controlId="firstName">
			    <Form.Label>First Name</Form.Label>
			    <Form.Control 
			        type="text" 
			        placeholder="Enter first name"
			        value={firstName} 
			        onChange={e => setFirstName(e.target.value)}
			        required
			    />
			</Form.Group>

			<Form.Group controlId="lastName">
			    <Form.Label>Last Name</Form.Label>
			    <Form.Control 
			        type="text" 
			        placeholder="Enter last name"
			        value={lastName} 
			        onChange={e => setLastName(e.target.value)}
			        required
			    />
			</Form.Group>

	      <Form.Group className="mb-3" controlId="userEmail">
	        <Form.Label>Email address</Form.Label>
	        <Form.Control 
	        	type="email" 
	        	placeholder="Enter email"
	        	value={ email }
	        	onChange={e => setEmail(e.target.value)}
	        	required/>
	        <Form.Text className="text-muted">
	          We'll never share your email with anyone else.
	        </Form.Text>
	      </Form.Group>

	{/*      <Form.Group controlId="mobileNo">
	          <Form.Label>Mobile Number</Form.Label>
	          <Form.Control 
	              type="text" 
	              placeholder="Enter Mobile Number"
	              value={mobileNo} 
	              onChange={e => setMobileNo(e.target.value)}
	              required
	          />
	      </Form.Group>*/}

	      <Form.Group className="mb-3" controlId="password1">
	        <Form.Label>Password</Form.Label>
	        <Form.Control 
	        	type="password" 
	        	placeholder="Password"
	        	value={ password1 }
	        	onChange={e => setPassword1(e.target.value)} 
	        	required/>
	      </Form.Group>
	      
	      <Form.Group className="mb-3" controlId="password2">
	        <Form.Label>Verify Password</Form.Label>
	        <Form.Control 
	        	type="password" 
	        	placeholder="Verify Password"
	        	value={ password2 }
	        	onChange={e => setPassword2(e.target.value)}  
	        	required/>
	      </Form.Group>

	      { isActive ?
	  			<Button variant="primary" type="submit" id="submitBtn">
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