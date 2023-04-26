

import { useState, useEffect, useContext } from 'react';
import { Container, Form, Card, Button, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function ProductView() {

	const { productId } = useParams();

	const { user } = useContext(UserContext);

	const navigate = useNavigate();

	const [ name, setName ] = useState()
	const [ description, setDescription ] = useState();
	const [ price , setPrice ] = useState(0);
	const [ quantity , setQuantity ] = useState(1);
	const [ stocks, setStocks] = useState();
	const [ image, setImage] = useState()
	const [ isActive, setIsActive ] = useState(false);


	const Increment = () => {
		setQuantity(quantity + 1)
	}

	const Decrement = () => {
		setQuantity(quantity + 1)

		let value = 1
		if(quantity <= value) {
			value = 1
		}
		else {
			value = quantity
		}

		setQuantity(value -1 )
	}


	function editProduct(e) {
			e.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`, {
			    method: "PUT",
			    headers: {
			        'Content-Type': 'application/json'
			    },
			    body: JSON.stringify({
			        name: name,
			        description: description,
			        price: price,
			        image: image,
			        stocks: stocks

			    })
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);


			if (data === true) {

				Swal.fire({
					title: "Successful",
					icon: 'success',
					text: "You have successfully edited this product."
				});

				// The navigate hook will allow us to navigate and redirect the user back to the courses page programmatically instead of using a component.
				navigate("/products/dashboard");

			} else {

				Swal.fire({
					title: "Something went wrong",
					icon: "error",
					text: "Please try again."
				});
			}
		});
	}

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
		.then(res => res.json())
		.then(data => {

			setName(data.name);
			setDescription(data.description);
			setPrice(data.price);
			setStocks(data.stocks);
			setImage(data.image)
		})

	}, [ productId ]);

	useEffect(() => {
	if((name !== '' && 
		description !== '' && 
		price !== ''
		)) {
			setIsActive(true);
	} else {
			setIsActive(false);
	}
	}, [name, description, price]);

	function addToCart(e) {

		fetch(`${process.env.REACT_APP_API_URL}/orders/createOrder`, {
			    method: "POST",
			    headers: {
			        'Content-Type': 'application/json'
			    },
			    body: JSON.stringify({
			        userId: user.id,
			        productId: productId,
			        price: price,
			        quantity: quantity,
					image: image,
			        totalAmount: price*quantity
			    })
		})
		.then(res => res.json())
		.then(data => {

            if (data === true) {
                Swal.fire({
                    title: 'Successful',
                    icon: 'success',
                    text: 'Added to cart'
                });

            } else {

                Swal.fire({
                    title: 'Something went wrong',
                    icon: 'error',
                    text: 'Please try again.'   
                });
            }

		});
	}

	// function buyNow(e)

	return (

		(user.id !== null && user.isAdmin === true) ?
		<div className="vh-100">
		<h1 className="text-center mt-5 text-light">Edit/Update A Product</h1>

		<Form className="mx-auto col-8 mb-3" onSubmit={(e) => editProduct(e)}>
			<Form.Group controlId="name">
			    <Form.Label>Product Name</Form.Label>
			    <Form.Control 
			        type="text" 
			        value={name} 
			        onChange={e => setName(e.target.value)}
			        required
			    />
			</Form.Group>

			<Form.Group controlId="description">
			    <Form.Label>Product Description</Form.Label>
			    <Form.Control 
			    	as="textarea"
			        type="text" 
			        value={ description } 
			        onChange={e => setDescription(e.target.value)}
			        required
			    />
			</Form.Group>

	      <Form.Group className="mb-3" controlId="price">
	        <Form.Label>Product Price</Form.Label>
	        <Form.Control 
	        	type="number" 
	        	value={ price }
	        	onChange={e => setPrice(e.target.value)}
	        	required/>
	      </Form.Group>

	      <Form.Group className="mb-3" controlId="price">
	      <Form.Label>Stocks</Form.Label>
	      <Form.Control className="input-bg"
	        	type="number" 
	        	value={ stocks }
	        	onChange={e => setStocks(e.target.value)}
	        	required/>
	      </Form.Group>

	      <Form.Group className="mb-3" controlId="price">
	      <Form.Label>Image</Form.Label>
	      <Form.Control className="input-bg"
	        	type="text" 
	        	value={ image }
	        	onChange={e => setImage(e.target.value)}
	        	required/>
	      </Form.Group>

	      { isActive ?
	  			<Button variant="primary" type="submit" id="submitBtn">
	  			  Update
	  			</Button>
	  			:
	  			<Button variant="danger" type="submit" id="submitBtn" disabled>
	  			  Update
	  			</Button>
	  		}
	    </Form>
	    </div>
	    :

	    <Container className="viewProdContainer d-flex bg-light 
	    	 col-xl-5 col-lg-6 col-md-7 col-sm-8 col-10
	    	 flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column
	    	 mt-5 px-auto">
	    	{/*For product image*/}
	    	<div className="viewProdImgCont container-fluid text-center py-auto 
	    		mx-auto
	    		col-xl-4 col-lg-4 col-md-5 col-sm-10 col-10
	    		my-5">
	    		<img className="d-flex container-fluid viewProdImg" src={image} />
	    	</div>
	    	{/*For product info*/}
	    	<div className="viewProdInfo container-fluid text-left px-4">
	    		{/*For title and desc*/}
	    		<div className="">
	    			<h3 className="viewProdName mt-2">{ name } </h3>
	    			<h6 className="viewProdDesc">{ description }</h6>
	    		</div>

	    		{/*Product price and sold*/}
	    		<div className="pt-2">
	    			<p className="viewProdPrice mb-1">Php { price }</p>
	    			<p className="viewProdSold">{ stocks } sold</p>
	    		</div>

	    		<div className="quantity-btn col-5 mb-2">
		    		<button className="qty-btn"onClick={()=>Decrement()} >-</button>
		    		<span className="qty-btn"> {quantity} </span>
		    		<button className="qty-btn" onClick={()=>Increment()}>+</button>
	    		</div>
	    		{/*For butons add to cart and buy now or shop now*/}
	    		
	    		{(user.id !== null) ?
	    		<div className="mb-2">
	    			<button type="button" as={Link} onClick={(e)=>addToCart()} className="addToCart col-xl-5 col-lg-5  col-md-6 col-8 mb-1">Add to cart </button>
	    			<button type="button" as={Link} className="buyNow col-xl-5 col-lg-5 col-md-5  col-8  mb-1"> Buy Now</button>
	    		</div>
	    			:
	    			<div className="text-center">
	    			<Link type="button" as={Link} className="shopNow col-8 mb-4" to="/login"> Shop Now </Link>
	    			</div>
	    		}
	    		
	    	</div>

	    </Container>
	)

}