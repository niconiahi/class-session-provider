import React, { FC, useState, useMemo } from 'react';

// context
import { SessionContext } from 'lib/providers/SessionProvider/context';

// lib
import { User } from 'lib/types';
import { safelyGetObject } from 'lib/helpers';

const SessionProvider: FC = ({ children }) => {
  const storedUser: User = safelyGetObject('user');

  const [user, setUser] = useState<User>(storedUser);
  const isAuthenticated = useMemo(() => Boolean(user?.token), [user]);

  const state = {
    isAuthenticated,
    user,
  };

  const actions = {
    setUser,
  };

  return <SessionContext.Provider value={{ state, actions }}>{children}</SessionContext.Provider>;
};

export default SessionProvider;
