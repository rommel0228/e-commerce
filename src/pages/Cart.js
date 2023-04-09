import { useEffect, useState, useContext } from 'react';

import UserContext from '../UserContext';

export default function Cart() {
    const { user } = useContext(UserContext);


    fetch(`${process.env.REACT_APP_API_URL}/orders/cart`,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: user.id
        })
    })
		.then(res => res.json())
		.then(data=> {
            console.log(data)
        })

    return(
        <p>p</p>
    )
}