import React, { FC, useState, useEffect } from 'react';

// context
import { SessionContext } from 'lib/providers/SessionProvider/context';

// lib
import { User } from 'lib/types';
import { safelyGetObject } from 'lib/helpers';

const SessionProvider: FC = ({ children }) => {
  const storedUser: User = safelyGetObject('user');

  const [user, setUser] = useState<User>(storedUser);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    if (user?.token) setIsAuthenticated(true);
  }, [user]);

  const state = {
    isAuthenticated,
    user,
  };

  const actions = {
    setIsAuthenticated,
    setUser,
  };

  return <SessionContext.Provider value={{ state, actions }}>{children}</SessionContext.Provider>;
};

export default SessionProvider;
