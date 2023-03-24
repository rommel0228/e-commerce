// built-in react modules imports
// import { Fragment } from 'react'; 
import { useState, useEffect} from 'react'; 

// downloaded package modules imports
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

import './App.css';
// (user-defined) components imports (alphabetical or according file structure)
import AppNavbar from './components/AppNavbar';
import Courses from './pages/Courses';
import ProductView from './components/ProductView';
/*import UpdateProductAdmin from './components/UpdateProductAdmin';*/
import Error from './pages/Error';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Products from './pages/Products';
import AdminDashboard from './pages/AdminDashboard';
import Register from './pages/Register';


import { UserProvider } from './UserContext';


  // To be executed in Home page
// import Banner from './components/Banner';
// import Highlights from './components/Highlights';

// React JS is a single page application (SPA)
// Whenever a link is clicked, it functions as if the page is being reloaded but what it actually does is it goes through the process of rendering, mounting, rerendering and unmounting components
// When a link is clicked, React JS changes the url of the application to mirror how HTML accesses its urls
// It renders the component executing the function component and it's expressions
// After rendering it mounts the component displaying the elements
// Whenever a state is updated or changes are made with React JS, it rerenders the component
// Lastly, when a different page is loaded, it unmounts the component and repeats this process
// The updating of the user interface closely mirrors that of how HTML deals with page navigation with the exception that React JS does not reload the whole page
function App() {
  // State hook for the user state that's defined here for a global scope
  // Initialized as an object with properties from the localStorage
  // This will be used to store the user information and will be used for validating if a user is logged in on the app or not
  const [ user, setUser] = useState({
      id: null,
      isAdmin: null
  });

  const unsetUser = () => {
    localStorage.clear();
  };

  useEffect(() => {
    fetch(`http://localhost:4000/users/details`,{
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {

      console.log(data)

      setUser({
        id: data._id,
        isAdmin: data.isAdmin
      })
    });
  }, [])


  return (

    // The `BrowserRouter` component will enable us to simulate page navigation by synchronizing the shown content and the shown URL in the web browser.
    <UserProvider value={{ user, setUser, unsetUser}}>
      <Router>      
        <Container fluid>   
        <AppNavbar />     
          {/*The `Routes` component holds all our Route components. It selects which `Route` component to show based on the URL Endpoint. For example, when the `/courses` is visited in the web browser, React.js will show the `Courses` component to us.*/}
          <Routes>
            <Route path="/" element={<Home />} />
            {/*<Route path="/courses" element={<Courses />} />*/}
            <Route path="/products/:productId" element={<ProductView />} />
            {/*<Route path="/products/:productId" element={<UpdateProductAdmin />} />*/}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />}/>
            <Route path="/products" element={<Products />}/>
            <Route path="/products/dashboard" element={<AdminDashboard />}/>
            <Route path="*" element={<Error />} />
          </Routes>
        </Container>
      </Router>

    </UserProvider>
   
  );
}

export default App;
