import { useContext } from 'react';

// lib
import { SessionContext } from 'lib/providers/SessionProvider/context';
import { User } from 'lib/types';

type LoginValues = {
  username: string;
  password: string;
};

export const useLogin = () => {
  const { actions } = useContext(SessionContext);
  const { setUser } = actions;

  const login = (values: LoginValues) => {
    return fetch('https://run.mocky.io/v3/2329e8fc-e223-4552-9931-65a2b7c9756c', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((user: User) => {
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
      })
      .catch((error: Error) => console.error(error.message));
  };

  return { login };
};
