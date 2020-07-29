import React from 'react';
import { useLogout } from 'lib/hooks/useLogout';

const Home = () => {
  const { logout } = useLogout();

  const handleLogoutClick = () => logout();

  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleLogoutClick}>LOGOUT</button>
    </div>
  );
};

export default Home;
