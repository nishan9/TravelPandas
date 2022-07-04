import { useAuth0 } from '@auth0/auth0-react';
import Landing from './Landing';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './Dashboard';
import Content from './Content';

function App() {

  const Auth0 = useAuth0();

  return (
    <>
      { Auth0.isAuthenticated ? 
        <Router>
          <Routes>
            <Route path="/" element={<Content/>} />
            <Route path="/Dashboard" element={<Dashboard />} />
          </Routes>
        </Router> 
        : 
        <Landing/> 
      }
    </>
  );
}

export default App;
