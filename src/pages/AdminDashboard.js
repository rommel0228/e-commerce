import { useEffect, useState } from 'react';
import CreateNewProduct from '../components/CreateNewProduct';
import ProductsAdmin from './ProductsAdmin'

import UserContext from '../UserContext';


export default function AdminDashboard(){
	
	return (
		<div className="mt-5">
			<div className="mx-auto col-11 col-xl-8 col-lg-8 col-md-10 col-sm-11">
			<CreateNewProduct/>
			</div>

			<div>
			<ProductsAdmin />
			</div>
		</div>
	)
}

