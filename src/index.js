import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react'
import 'bootstrap/dist/css/bootstrap.min.css';


const providerConfig = {
  domain:'dev-oy02vbcsw1gnx5xw.us.auth0.com',
  clientId:'MZm8GQlzJg8sVNy2OyBeei8cvbW91G0n',
  redirectUri: window.location.origin,
  authorizationParams: {
    redirect_uri: "http://localhost:3000/editor",
    audience:"https://yourApiIdentifier.com",
  },
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      {...providerConfig}
    >
    <App />
    </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
