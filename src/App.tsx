import { useAuth0 } from '@auth0/auth0-react';
import Landing from './Landing';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './Dashboard';
import Content from './Content';
import Bookings from './Bookings';

function App() {

  const Auth0 = useAuth0();

  return (
    <>
      { Auth0.isAuthenticated ? 
        <Router>
          <Routes>
            <Route path="/" element={<Content/>} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Bookings/:id" element={<Bookings />} />
          </Routes>
        </Router> 
        : 
        <Landing/>
      }
    </>
  );
}

export default App;
