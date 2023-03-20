import ProductCard from '../components/ProductCard';
import FeaturedProductsCarousel from '../components/FeaturedProductsCarousel';

//import data from database
import productsData from '../data/products';


export default function Products() {
	console.log(productsData);
	console.log(productsData[0]);
	const products = productsData.map(product => {
		return (
			<ProductCard key = {product.id} product = {product} />
		)
	});

	return(
	<>
		<>
			<FeaturedProductsCarousel/>
		</>
		<>
			{ products }
		</>
	</>
	)
}