//built in react modules import
import {Fragment} from 'react';

// downloaded modules 
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router} from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

import './App.css'
//user defined component imports
import AppNavbar from './components/AppNavbar';
import Courses from './pages/Courses';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';

//To be executed in the homepage
// import Banner from './components/Banner';
// import Highlights from './components/Highlights';

function App() {
  return (

    <Router>
        <Container fluid>
        <AppNavbar/>
          {/*The `Routes` component holds all our Route components. It selects which `Route` component to show based on the URL Endpoint. For example, when the `/courses` is visited in the web browser, React.js will show the `Courses` component to us.*/}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </Container>
    </Router>
    























    /*
      - In React JS, multiple components rendered in a single component should be wrapped in a parent component.
      - Not doing so will return an error in our application.
      - The "Fragment" component ensures that this error can be prevented.
    */



//     <Fragment>
//       <AppNavbar />
//       <Container>
//         <Home />
//         <Courses />
//         <Login />
//         <Register />
// {/*        <Banner />
//         <Highlights />*/}
//       </Container>
//     </Fragment>
    /* <>
      <AppNavbar />
      <Container>
      <Banner />
      </Container>
    </>
   <div>
      <AppNavbar />
      <Container>
      <Banner />
      </Container>
    </div>
    */
  );
}

export default App;
