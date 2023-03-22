import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';


export default function Products(){

	const [ product, setProducts ] = useState([]);

	useEffect(() => {

		fetch(`http://localhost:4000/products/allactive/`)
		.then(res => res.json())
		.then(data=> {

			console.log(data);

			setProducts(data.map(product=> {
				return (
					<ProductCard key={ product._id } product={product} />
				);
			}));
		})
	}, []);

	

	
	return (
		<>
			{ product }
		</>
	)
}