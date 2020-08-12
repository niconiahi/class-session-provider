This is a POC for basic private (protected) routes and public route. With custom hooks to control login and logout events

#### [Link to demo](https://class-session-provider.niconiahi.vercel.app)

#### This includes:

A provider for handling the user session, in sync with localStorage: `<SessionProvider />`</br>
Custom `Route` components: `<ProtectedRoute />` and `<PublicRoute />`</br>
Two custom hooks: `useLogin()` and `useLogout()`</br>
A form with validation featuring Formik and Yup: `<Login />`</br>
Some scafolding I like to use</br>
Some helpers</br>

#### Libraries used:

- Formik
- React
- React Router Dom
- Yup

#### Language:

- Typescript

#### Application tree:

```
.
├── components
│   ├── Home.tsx
│   └── Login.tsx
├── lib
│   ├── hooks
│   │   ├── useLogin.ts
│   │   └── useLogout.ts
│   ├── providers
│   │   └── SessionProvider
│   │       ├── context.ts
│   │       └── provider.tsx
│   ├── constants.tsx
│   ├── helpers.ts
│   ├── router.tsx
│   ├── routes.ts
│   └── types.ts
├── index.css
├── index.tsx
└── react-app-env.d.ts
```

Hope you enjoy it!
