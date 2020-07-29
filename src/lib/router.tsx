import React, { useContext, FC } from 'react';
import { Route, Redirect } from 'react-router-dom';

// lib
import { SessionContext } from 'lib/providers/SessionProvider/context';
import { ROUTES } from 'lib/routes';

type Props = {
  path: string;
};

export const ProtectedRoute: FC<Props> = ({ children, path }) => {
  const { state } = useContext(SessionContext);
  const { isAuthenticated } = state;

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

  if (isAuthenticated) return <Redirect to={ROUTES.home} />;

  return (
    <Route exact path={path}>
      {children}
    </Route>
  );
};
