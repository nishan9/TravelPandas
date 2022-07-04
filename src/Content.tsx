import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import Signup from './Signup';
import Loading from './Images/json/lf30_editor_eg0qzji7.json'; 
import LoadingBubbles from './Images/json/97930-loading.json'; 
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import Dashboard from './Dashboard';

function Content() {

    const { logout } = useAuth0(); 
    const [isRegistered, setIsRegistered] = useState<string>(); 
    const Auth0 = useAuth0();

    useEffect(() => {
        Registered(); 
      },[])
    
      async function Registered(){
        
        const token = await Auth0.getAccessTokenSilently();
        const response = await fetch(`${process.env.REACT_APP_API_URL}/Users/isRegistered`, { 
          method:"GET", 
          headers: {
              "Content-Type": "application/json",
              "Authorization" : `Bearer ${token}`, 
          }
        })
        console.log(token)
        if(response.ok) {
          const data = await response.text()
          setIsRegistered(data)
        } else {
          console.error("Publishing failed");
        }
      }



  return (
    <>          
        {isRegistered === undefined
        ?
        <>
            <Player
            autoplay
            loop
            src={LoadingBubbles}
            style={{ height: '200px' }}
            >
            </Player>
            <Player
            autoplay
            loop
            src={Loading}
            style={{ height: '500px' }}
            >
            </Player>

        </>
        :
        isRegistered === "false"
        ?
        <> 
             <Signup/>
        </> 
        : 
        <>
            <Dashboard/>
        </>
        }
    </>
  )
}

export default Content