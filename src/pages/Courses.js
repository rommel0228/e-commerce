import { useEffect, useState } from 'react';
import CourseCard from '../components/CourseCard';



export default function Courses(){


	const [ course, setCourses ] = useState([]);

	useEffect(() => {

		fetch(`http://localhost:4000/courses/`)
		.then(res => res.json())
		.then(data => {

			console.log(data);

			setCourses(data.map(course => {
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