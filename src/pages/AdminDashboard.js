import { useEffect, useState } from 'react';
import CreateNewProduct from '../components/CreateNewProduct';
import ProductsAdmin from './ProductsAdmin'


export default function AdminDashboard(){
	
	return (
		<div className="mt-5">

			<div className="mx-auto col-12 col-lg-8 col-md-10 col-sm-11 col-xs-11">
			<CreateNewProduct/>
			</div>

			<div>
			<h1 className="text-center m-5">All Products List</h1>
			<ProductsAdmin />
			</div>
		</div>
	)
}

