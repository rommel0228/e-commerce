import { useEffect, useState, useContext } from 'react';
import ProductCard from '../components/ProductCard';
import UserContext from '../UserContext';

export default function Products(){
	const { user } = useContext(UserContext);

	const [ product, setProducts ] = useState([]);

	function url(){
		if (user.isAdmin === true) {
			return 'http://localhost:4000/products/all/'
		} else if (user.isAdmin === false) {
			return 'http://localhost:4000/products/allactive/'
		}
	};

	useEffect(() => {
		fetch(url())
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