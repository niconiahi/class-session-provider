import React, { FC } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';

// lib
import { useLogin } from 'lib/hooks/useLogin';

const validationSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

const initialValues = {
  username: '',
  password: '',
};

type LoginValues = {
  username: string;
  password: string;
};

const Login: FC = () => {
  const { login } = useLogin();

  const onSubmit = (values: LoginValues) => login(values);

  const { values, handleChange, handleSubmit } = useFormik<LoginValues>({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Usuario</label>
      <input id="username" value={values.username} name="username" onChange={handleChange} />

      <label htmlFor="password">Contrasena</label>
      <input id="password" value={values.password} name="password" onChange={handleChange} type="password" />
      <button type="submit">LOGIN</button>
    </form>
  );
};

export default Login;
