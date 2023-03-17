
import CourseCard from '../components/CourseCard';

//import data from database
import coursesData from '../data/courses';

export default function Courses() {
	console.log(coursesData);
	console.log(coursesData[0]);

	// The "map" method loops through the individual course objects in our array and returns a component for each course
	// Multiple components created through the map method must have a unique key that will help React JS identify which components/elements have been changed, added or removed
	// Everytime the map method loops through the data, it creates a "CourseCard" component and then passes the current element in our coursesData array using the courseProp
	const courses = coursesData.map(course => {
		return (
			<CourseCard key = {course.id} course = {course} />
		)
	})

// The "course" in the CourseCard component is called a "prop" which is a shorthand for "property" since components are considered as objects in React JS
// The curly braces ({}) are used for props to signify that we are providing information using JavaScript expressions rather than hard coded values which use double quotes ("")
// We can pass information from one component to another using props. This is referred to as "props drilling"
	return(
		<>
			{ courses }
		</>
	)
}