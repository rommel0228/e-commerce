//This is a product page that will be displayed on AdminDashboard.js

import { useEffect, useState, useContext } from 'react';
import ProductCardAdmin from '../components/ProductCardAdmin';
import UserContext from '../UserContext';


export default function ProductsAdmin(){
	const { user } = useContext(UserContext);

	const [ product, setProducts ] = useState([]);

	useEffect(() => {
		fetch('http://localhost:4000/products/all/')
		.then(res => res.json())
		.then(data=> {

			console.log(data);

			setProducts(data.map(product=> {
				return (
					<ProductCardAdmin key={ product._id } product={product} />
				);
			}));
		})
	}, []);


	return (
		(user.isAdmin === true) ?
		<>
			{ product }
		</>
		:
		<p>You do not have access to this page </p>
	)
}