import { useEffect, useState } from 'react';
import CourseCard from '../components/CourseCard';

// import mock database
// import coursesData from '../data/courses';

export default function Courses(){

	// Checks to see if the mock data was captured
	// console.log(coursesData);
	// console.log(coursesData[0]);

	const [ course, setCourses ] = useState([]);

	useEffect(() => {

		fetch(`http://localhost:4000/courses`)
		.then(res => res.json())
		.then(data => {

			console.log(data);

			// The "map" method loops through the individual course objects in our array and returns a component for each course
		    // Multiple components created through the map method must have a unique key that will help React JS identify which components/elements have been changed, added or removed
		    // Everytime the map method loops through the data, it creates a "CourseCard" component and then passes thn e current element iour coursesData array using the courseProp
		    	// Sets the "courses" state to map the data retrieved from the fetch request into several "CourseCard" components
			setCourses(data.map(course => {

				// The "course" in the CourseCard component is called a "prop" which is a shorthand for "property" since components are considered as objects in React JS
				// The curly braces ({}) are used for props to signify that we are providing information using JavaScript expressions rather than hard coded values which use double quotes ("")
				// We can pass information from one component to another using props. This is referred to as "props drilling"
				return (
					<CourseCard key={ course._id } course={course} />
				);
			}));
		})
	}, []);

	

	
	return (
		<>
			{ course }
		</>
	)
}