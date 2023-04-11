import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import UserContext from '../UserContext';



export default function Cart() {
    // const { user } = useContext(UserContext);
    // fetch(`${process.env.REACT_APP_API_URL}/orders/cart/:${user.id}`)
	// 	.then(res => res.json())
	// 	.then(data=> {
    //         console.log(data)
    //     })

    return(
            <h1 className='text-center m-5 text-light'>Coming Soon...</h1>
  
    )
}