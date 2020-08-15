import React from "react";

// types

// helpers

// constants

// hooks

// components

// custom router

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

// Steps:
// 1. Crear Login y Home. Routing (creacion componentes custom <Router />) y wrappear Home y Login
// 2. Session provider (y context tambien)
// 3. Custom hooks de Login y Logout
// 4. Terminar y conectar los componentes Home y Login
// 5. Persistir la data de session con local storage

const App = () => <h1>App</h1>;

export default App;
