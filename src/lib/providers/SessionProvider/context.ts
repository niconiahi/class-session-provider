import { createContext } from 'react';

// lib
import { User } from 'lib/types';
import { EMPTY_USER } from 'lib/constants';

type SessionContextValues = {
  state: {
    isAuthenticated: boolean;
    user: User;
  };
  actions: {
    setUser: (user: User) => void;
  };
};

export const SessionContext = createContext<SessionContextValues>({
  state: {
    isAuthenticated: false,
    user: EMPTY_USER,
  },
  actions: {
    setUser: () => {},
  },
});
