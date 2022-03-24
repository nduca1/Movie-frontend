import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./Header.css";

function Header({ user, logout }) {
  console.log(user);
  return (
    <div className="header-container">
      <div className="header-container-title">
        <h1>Noble Movie App</h1>
      </div>

      <div className="header-link">
        {user ? (
          <>
            {" "}
            <NavLink
              to="/movie"
              className={({ isActive }) =>
                isActive ? "active-nav-link" : undefined
              }
            >
              movie
            </NavLink>{" "}
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? "active-nav-link" : undefined
              }
            >
              Welcome back <strong>{user.username}</strong>
            </NavLink>
            <Link to="/login" onClick={logout}>
              Logout
            </Link>
          </>
        ) : (
          <>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "active-nav-link" : undefined
              }
            >
              Home
            </NavLink>{" "}
            <NavLink
              to="/sign-up"
              className={({ isActive }) =>
                isActive ? "active-nav-link" : undefined
              }
            >
              Sign up
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "active-nav-link" : undefined
              }
            >
              Login
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
