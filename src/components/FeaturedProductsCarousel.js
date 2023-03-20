//For capstone 3
import Carousel from 'react-bootstrap/Carousel';

import { useState , useEffect } from 'react';

import PropTypes from 'prop-types';
import {Row, Col, Card, Button} from 'react-bootstrap';

export default function ProductCarousel(){
	return (
			<Carousel>
     			<Carousel.Item className="productBanner">
        		<img
		          className="d-block w-100"
		          src="https://backend.central.co.th/media/wysiwyg/Listpage2021/05-may/20210523_listpage_CDGadget01.jpg"
		          alt="First slide"
        		/>
      			</Carousel.Item>
		      	<Carousel.Item className="productBanner">
		        <img
		          className="d-block w-100"
		          src="https://d1wrxu8gicsgam.cloudfront.net/wp-content/files/django-logo-big.jpg"
		          alt="Second slide"
		        />
		      	</Carousel.Item>
		      	<Carousel.Item className="productBanner">
		        <img
		          className="d-block w-100"
		          src="https://res.cloudinary.com/practicaldev/image/fetch/s--zrUJwvgZ--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/bupbqc9fctvw4j7r14it.png"
		          alt="Third slide"
		        />
		      	</Carousel.Item>
		    </Carousel>		
	)
}
	