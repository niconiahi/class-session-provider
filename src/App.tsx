import React, { FC } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

// types

// helpers

// constants
const ROUTES = {
  home: "/home",
  login: "/login",
};

// hooks

// components
const Home = () => <h1>Home</h1>;
const Login = () => <h1>Login</h1>;

// custom router
type RouteProps = {
  path: string;
};

const PublicRoute: FC<RouteProps> = ({ children, path }) => {
  // Need to get if the user is logged in or not from the Session Provider
  const isAuthenticated = false;

  if (isAuthenticated) return <Redirect to={ROUTES.home} />;

  return (
    <Route exact path={path}>
      {children}
    </Route>
  );
};

const ProtectedRoute: FC<RouteProps> = ({ children, path }) => {
  // Need to get if the user is logged in or not from the Session Provider
  const isAuthenticated = false;

  if (!isAuthenticated) return <Redirect to={ROUTES.login} />;

  return (
    <Route exact path={path}>
      {children}
    </Route>
  );
};

// providers

// 1. Provider (context) that will provide all the app with the knowledge
//    if the user is authenticated, or not
//    This one will return a boolean showing if the user is, or not, authenticated
//    and a getter/setter to manipulate user data
// 1. Un provider (context) que proveera a toda la aplicacion el conocimiento
//    de si el usuario esta logeado, o no
//    Este va a deolver un booleano diciendonos si el usuario esta, o no, logeado
//    y un getter/setter (leer/mutar) para manupular la data del usuario

// 2. Router with custom <Route /> component which internally knows what
//    to do, if let the user pass, or not
// 2. Un routing con un componente <Route /> custom que sepa internamente
//    si dejar pasar al usuario a la url requerida, o no
//    :+1:

// 3. Two custom hooks to handle login in and logging out from the application,
//    with internal logic to correctly manipulate user data. Less login within
//    components and totally reutilizable
// 3. Dos custom hooks que nos permitiran handlear el login y el logout de la aplicacion,
//    con la logica manejada intermaente para manejar correctamente la data del usuario.
//    Menos logica en components y totalmente reutilizable

// 4. Login component (with a simple Formik and validation through Yup) which
//    we will need to trigger the POC (Proof of Concept)
// 4. Un componente de login (con un simple Formik y validaciones por Yup) el cual
//    necesitaremos para disparar la Prueba de Concepto

const App = () => (
  <BrowserRouter>
    <PublicRoute path={ROUTES.login}>
      <Login />
    </PublicRoute>
    <ProtectedRoute path={ROUTES.home}>
      <Home />
    </ProtectedRoute>
    <ProtectedRoute path="*">
      <Home />
    </ProtectedRoute>
  </BrowserRouter>
);

export default App;
