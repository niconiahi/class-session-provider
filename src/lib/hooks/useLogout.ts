import { useContext } from 'react';

// lib
import { SessionContext } from 'lib/providers/SessionProvider/context';
import { EMPTY_USER } from 'lib/constants';

export const useLogout = () => {
  const { actions } = useContext(SessionContext);
  const { setUser } = actions;

  const logout = () => {
    localStorage.removeItem('user');
    setUser(EMPTY_USER);
  };

  return { logout };
};
