import { Link } from 'react-router-dom';

import {Row, Col, Card, Button} from 'react-bootstrap';

export default function OrderCard({order}){

console.log(order.products[0].image)
	return (
       <Col className="productCard px-2 mt-2">
			<Card id="productCardItem" style={{width: '95vw', height: "auto" }}>
               <div className='d-flex'>
                    <div className='col-4'>
                        <Card.Img className="productImage" variant="left" src={order.products[0].image}/>
                    </div>
                    <div className='col-8'>
                        <Card.Body className="d-flex flex-column mx-auto">
                            <Card.Subtitle className="container-fluid" id="">{ order._id }</Card.Subtitle>
                            <Card.Subtitle className="" id="">Php { order.totalAmount }</Card.Subtitle>
                        </Card.Body>
                    </div>
               </div>

			    
			</Card>
		</Col>
	)
}
