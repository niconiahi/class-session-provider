import React, { StrictMode } from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';

// styles
import './index.css';

// components
import Home from 'components/Home';
import Login from 'components/Login';

// providers
import SessionProvider from 'lib/providers/SessionProvider/provider';

// lib
import { ROUTES } from 'lib/routes';
import { ProtectedRoute, PublicRoute } from 'lib/router';

const App = () => (
  <StrictMode>
    <SessionProvider>
      <BrowserRouter>
        <Switch>
          {/* 
          1. A public route (PublicRoute) to the Login, using path from a routes constant 
          2. A private route (ProtectedRoute) to Home, using path from a routes constant
          3. Any other (if you are logged in), you go home
          */}
          <PublicRoute path={ROUTES.login}>
            <Login />
          </PublicRoute>
          <ProtectedRoute path={ROUTES.home}>
            <Home />
          </ProtectedRoute>
          <ProtectedRoute path="*">
            <Home />
          </ProtectedRoute>
        </Switch>
      </BrowserRouter>
    </SessionProvider>
  </StrictMode>
);

ReactDOM.render(<App />, document.getElementById('root'));
