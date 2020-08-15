import React, { useContext, FC } from 'react';
import { Route, Redirect } from 'react-router-dom';

// lib
import { SessionContext } from 'lib/providers/SessionProvider/context';
import { ROUTES } from 'lib/routes';

type Props = {
  path: string;
};

export const ProtectedRoute: FC<Props> = ({ children, path }) => {
  // Get the user data from user session context
  const { state } = useContext(SessionContext);
  const { isAuthenticated } = state;

  // If the user is not authenticated, we send him to the Login,
  // because this is a protected route
  if (!isAuthenticated) return <Redirect to={ROUTES.login} />;

  return (
    <Route exact path={path}>
      {children}
    </Route>
  );
};

export const PublicRoute: FC<Props> = ({ children, path }) => {
  const { state } = useContext(SessionContext);
  const { isAuthenticated } = state;

  // If the user is authenticated, we send him to the Home,
  // because public paths are the ones which user should go
  // when the user has not yet logged in
  if (isAuthenticated) return <Redirect to={ROUTES.home} />;

  return (
    <Route exact path={path}>
      {children}
    </Route>
  );
};
