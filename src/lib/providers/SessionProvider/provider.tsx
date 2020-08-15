import React, { FC, useState, useMemo } from 'react';

// context
import { SessionContext } from 'lib/providers/SessionProvider/context';

// lib
import { User } from 'lib/types';
import { safelyGetObject } from 'lib/helpers';

const SessionProvider: FC = ({ children }) => {
  // Whenever the react tree renders, the user value will be equal to the one
  // stored in local storage under the name 'user'
  const storedUser: User = safelyGetObject('user');

  const [user, setUser] = useState<User>(storedUser);

  // How do we know if an user is authenticated? Well, if he has a token, he is.
  // The value should be calculated again, only in user changes
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
