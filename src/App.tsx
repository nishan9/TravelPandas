import { useAuth0 } from '@auth0/auth0-react';
import Landing from './Landing';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './Dashboard';
import Content from './Content';
import Bookings from './Bookings';
import MyBookings from './MyBookings';
import Profile from './Profile';
import Savings from './Savings';

function App() {

  const Auth0 = useAuth0();
  console.log(Auth0.isAuthenticated)

  return (
    <>
      { Auth0.isAuthenticated ? 
        <Router>
          <Routes>
            <Route path="/" element={<Content/>} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="Dashboard/Bookings/:id" element={<Bookings />} />
            <Route path="Profile" element={<Profile />} />
            <Route path="MyBookings" element={<MyBookings />} />
            <Route path="Savings" element={<Savings />} />
          </Routes>
        </Router> 
        : 
        <Landing/> 
      }
    </>
  );
}

export default App;
