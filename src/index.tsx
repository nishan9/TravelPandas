import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthConfig from './config/AuthConfig';
import { Auth0Provider } from '@auth0/auth0-react';
import "./index.css"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={AuthConfig.AUTH0_DOMAIN}
      clientId={AuthConfig.AUTH0_CLIENT_ID}
      audience={AuthConfig.AUTH0_AUDIENCE}
      redirectUri={window.location.origin}
      >
    <App />
    </Auth0Provider>
  </React.StrictMode>
);