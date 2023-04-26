import { useEffect, useState, useContext } from 'react';
import ProductCard from '../components/ProductCard';
import UserContext from '../UserContext';

export default function Products(){
	const { user } = useContext(UserContext);

	const [ product, setProducts ] = useState([]);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/products/allactive/`)
		.then(res => res.json())
		.then(data=> {
			setProducts(data.map(product=> {
				return (
					<ProductCard key={ product._id } product={product} />
				);
			}));
		})
	}, []);


	return (
		<div className="text-center">
			{ product }
		</div>
	)
}