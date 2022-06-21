import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import AppBar from './Navigation';
import Landing from './Landing';
import { Button } from '@mui/material';
import Signup from './Signup';

function App() {
  const Auth0 = useAuth0(); 
  const { logout } = useAuth0(); 
  const isRegistered = false; 

  // GET Request to check if the user is registered or not

  return (
    <>
      {Auth0.isAuthenticated ? 
        <>
          
          {!isRegistered ? <> <Signup/> </> : 
            <>
              <Button variant="contained" onClick={() => logout() }> Logout </Button> 
            </>
          }
          
        </> 
        : 
          <Landing/> 
      }
    </>
  );
}

export default App;
