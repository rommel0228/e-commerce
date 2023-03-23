import { useEffect, useState } from 'react';
import CreateNewProduct from '../components/CreateNewProduct';
import ProductsAdmin from './ProductsAdmin'


export default function AdminDashboard(){
	
	return (
		<>
			<CreateNewProduct />
			<ProductsAdmin />
		</>
	)
}