import Banner from '../components/Banner';
// import CourseCard from '../components/CourseCard'; will be imported to Courses page
import Highlights from '../components/Highlights';

export default function Home() {

	const data = {
	    title: "Zuitt Coding Bootcamp",
	    content: "Opportunities for everyone, everywhere",
	    destination: "/courses",
	    label: "Enroll now!"
	}

	return (
		<>
			<Banner data={ data } />
			<Highlights />
			{/*<CourseCard />*/}
		</>
	)
}
