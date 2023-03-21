// import { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function CourseCard({ course }) {

    // Checks to see if the data was successfully passed
    // console.log(props);
    // Every component receives information in a form of an object
    // console.log(typeof props);

    // Deconstruct the course properties into their own variables
    const { _id, name, description, price } = course;

    // Use the state hook for this component to be able to store its state
    // States are used to keep track of information related to individual components
    // Syntax
        // const [getter, setter] = useState(initialGetterValue);
   /* const [count, setCount] = useState(0);
    // Use state hook for getting and setting the seats for this course
    const [seats, setSeats] = useState(30);

    // Using the state hook returns an array with the first element being a value and the second element as a function that's used to change the value of the first element
    // console.log(useState(0));

    function enroll() {
        if (seats > 0) {
            setCount(count + 1);
            console.log('Enrollees: ' + count);
            setSeats(seats - 1);
            console.log('Seats: ' + seats);
        } else {
            alert("No more seats available");
        };
    }*/

    // Define a "useEffect" hook to have the "CourseCard" component do perform a certain task after every DOM update
    // This is run automatically both after initial render and for every DOM update
    // Checking for the availability for enrollment of a course is better suited here
    // [seats] is an OPTIONAL parameter
    // React will re-run this effect ONLY if any of the values contained in this array has changed from the last render / update
    // useEffect(() => {
    //     if(seats === 0){
    //         setSeats(false);
    //     }

    // }, [seats]);

    return (
        <Card className="my-3">
            <Card.Body>
                <Card.Title>{ name }</Card.Title>
                <Card.Subtitle>Description:</Card.Subtitle>
                <Card.Text>{ description }</Card.Text>
                <Card.Subtitle>Price:</Card.Subtitle>
                <Card.Text>{ price }</Card.Text>
                <Link className="btn btn-primary" to={`/courses/${_id}`}>Details</Link>
            </Card.Body>
        </Card>
    )
}

// Check if the CourseCard component is getting the correct prop types
// Proptypes are used for validating information passed to a component and is a tool normally used to help developers ensure the correct information is passed from one component to the next
/*CourseCard.PropTypes = {

    // The "shape" method is used to check if a prop object conforms to a specific "shape"
    course: PropTypes.shape({
        // Define the properties and their expected types
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired

    })
}*/