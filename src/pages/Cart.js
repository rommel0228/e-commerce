import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import OrderCard from '../components/OrderCard';


import UserContext from '../UserContext';



export default function Cart() {
    const [ order, setOrders ] = useState([]);

    const { user } = useContext(UserContext);

    useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/orders/cart/${user.id}`)
		.then(res => res.json())
		.then(data=> {
            console.log(data)
            setOrders(data.map(order => {
                return(
                    <OrderCard key={order._id} order = {order} />
                );
            }))
        })
    }, []);

    return(
        <div>
            {order}
        </div>	
	)
}