import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@asgardeo/auth-react';
// import { asgardeoConfig } from './configs/asgardeoConfig';
import { defaultTheme } from './themes/default';
import { CssBaseline, ThemeProvider } from '@mui/material';
import AppContextProvider from './contexts/AppContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const asgardeoConfig = {
  signInRedirectURL: window.config.signInRedirectURL,
  signOutRedirectURL: window.config.signOutRedirectURL,
  clientID: window.config.clientID!,
  baseUrl: window.config.baseUrl,
  scope: [ "openid","profile" ]
}

root.render(
    <ThemeProvider theme={defaultTheme}>
      <AuthProvider config={asgardeoConfig}>
        <AppContextProvider>
          <BrowserRouter>
            <CssBaseline />
            <App />
          </BrowserRouter>
        </AppContextProvider>
      </AuthProvider>
    </ThemeProvider>
);
