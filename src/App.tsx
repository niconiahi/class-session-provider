import React, { FC, useState, createContext, useContext, useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BrowserRouter, Route, Redirect, useHistory } from "react-router-dom";

// types
type User = {
  name: string;
  lastname: string;
  id: number;
  token: string;
};

// helpers

// constants
const EMPTY_USER = {
  name: "",
  lastname: "",
  id: 0,
  token: "",
};

const ROUTES = {
  home: "/home",
  login: "/login",
};

// hooks
type LoginValues = {
  username: string;
  password: string;
};

const useLogin = () => {
  const { actions } = useContext(SessionContext);
  const { setUser } = actions;

  const { push } = useHistory();

  const login = (values: LoginValues) => {
    return fetch(
      "https://run.mocky.io/v3/2329e8fc-e223-4552-9931-65a2b7c9756c",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    )
      .then((res) => res.json())
      .then((user: User) => {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
      })
      .then(() => {
        push(ROUTES.home);
      })
      .catch((error: Error) => console.error(error.message));
  };

  return { login };
};

const useLogout = () => {
  const { actions } = useContext(SessionContext);
  const { setUser } = actions;

  const logout = () => {
    localStorage.removeItem("user");
    setUser(EMPTY_USER);
  };

  return { logout };
};

// components
const Home = () => {
  const { logout } = useLogout();

  const handleLogoutClick = () => logout();

  return (
    <div style={{ backgroundColor: "red" }}>
      <h1>Home</h1>
      <button onClick={handleLogoutClick}>LOGOUT</button>
    </div>
  );
};

const Login = () => {
  const { login } = useLogin();

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required(),
  });

  const onSubmit = (values: LoginValues) => login(values);

  const { handleChange, handleSubmit, values } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">User</label>
      <input
        id="username"
        placeholder="Type your username"
        value={values.username}
        onChange={handleChange}
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        placeholder="Type your password"
        value={values.password}
        onChange={handleChange}
      />

      <button type="submit">LOGIN</button>
    </form>
  );
};

// custom router
type RouteProps = {
  path: string;
};

const PublicRoute: FC<RouteProps> = ({ children, path }) => {
  const { state } = useContext(SessionContext);
  const { isAuthenticated } = state;

  if (isAuthenticated) return <Redirect to={ROUTES.home} />;

  return (
    <Route exact path={path}>
      {children}
    </Route>
  );
};

const ProtectedRoute: FC<RouteProps> = ({ children, path }) => {
  const { state } = useContext(SessionContext);
  const { isAuthenticated } = state;

  if (!isAuthenticated) return <Redirect to={ROUTES.login} />;

  return (
    <Route exact path={path}>
      {children}
    </Route>
  );
};

// providers
type SessionContextValues = {
  state: {
    isAuthenticated: boolean;
    user: User;
  };
  actions: {
    setUser: (user: User) => void;
  };
};

const SessionContext = createContext<SessionContextValues>({
  state: {
    isAuthenticated: false,
    user: EMPTY_USER,
  },
  actions: {
    setUser: () => {},
  },
});

const SessionProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User>(EMPTY_USER);

  const isAuthenticated = useMemo(() => Boolean(user?.token), [user]);

  const state = {
    isAuthenticated,
    user,
  };

  const actions = {
    setUser,
  };

  return (
    <SessionContext.Provider value={{ state, actions }}>
      {children}
    </SessionContext.Provider>
  );
};

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
    <SessionProvider>
      <PublicRoute path={ROUTES.login}>
        <Login />
      </PublicRoute>
      <ProtectedRoute path={ROUTES.home}>
        <Home />
      </ProtectedRoute>
      <ProtectedRoute path="*">
        <Home />
      </ProtectedRoute>
    </SessionProvider>
  </BrowserRouter>
);

export default App;
