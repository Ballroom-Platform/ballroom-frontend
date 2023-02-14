import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@asgardeo/auth-react';
import { asgardeoConfig } from './configs/asgardeoConfig';
import { ThemeProvider } from '@emotion/react';
import { defaultTheme } from './themes/default';
import { CssBaseline } from '@mui/material';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

console.log(defaultTheme);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <AuthProvider config={asgardeoConfig}>
        <BrowserRouter>
          <CssBaseline />
          <App />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
