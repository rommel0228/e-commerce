//built in react modules import
import {Fragment} from 'react';

// downloaded modules 
import {Container} from 'react-bootstrap'

import './App.css'
//user defined component imports
import AppNavbar from './components/AppNavbar';
// import Courses from './pages/Courses';
// import Home from './pages/Home';
import Login from './pages/Login'
import Register from './pages/Register'

//To be executed in the homepage
// import Banner from './components/Banner';
// import Highlights from './components/Highlights';

function App() {
  return (
    /*
      - In React JS, multiple components rendered in a single component should be wrapped in a parent component.
      - Not doing so will return an error in our application.
      - The "Fragment" component ensures that this error can be prevented.
    */
    <Fragment>
      <AppNavbar />
      <Container>
{/*     <Home />
        <Courses />*/}
       <Login />
        {/*<Register />*/}
{/*        <Banner />
        <Highlights />*/}
      </Container>
    </Fragment>
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
