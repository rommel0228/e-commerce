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
		          className="d-block mx-auto"
		          src="https://png.pngtree.com/thumb_back/fh260/background/20201101/pngtree-cyber-monday-sale-on-pink-gadget-light-background-image_446148.jpg"
		          alt="First slide"
        		/>
      			</Carousel.Item>
		      	<Carousel.Item className="productBanner">
		        <img
		          className="d-block mx-auto"
		          src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/headset-ads-digital-display-design-template-f65587445212b9e1df7d1414e162913b_screen.jpg?ts=1628834079"
		          alt="Second slide"
		        />
		      	</Carousel.Item>
		      	<Carousel.Item className="productBanner">
		        <img
		          className="d-block mx-auto"
		          src="https://www.desktopbackground.org/download/o/2012/08/10/434307_online-shopping-revolution-its-here-zscoop_1920x1080_h.png"
		          alt="Third slide"
		        />
		      	</Carousel.Item>
		    </Carousel>		
	)
}
	