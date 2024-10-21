import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ user, setUser }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">MTG Match Tracker</Link>
      </div>
      <div className="navbar-menu">
        {user ? (
          <>
            <span>Welcome, {user.username}!</span>
            <Link to="/tracker">Match Tracker</Link>
            <button onClick={() => setUser(null)}>Sign Out</button>
          </>
        ) : (
          <>
            <Link to="/signup">Sign Up</Link>
            <Link to="/signin">Sign In</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;