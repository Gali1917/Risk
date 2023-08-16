import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/providers/userContext";

import "../../styles/navbar.css";

const Header = () => {
  const { isLoggedIn, logout } = useUser();
  return (
    <header>
      <div className="logo-header">
        <img
          src="https://i.postimg.cc/rs47rpb2/LOGO-RISK-SOLUTIONS-GROUP-Final.png"
          alt="Logo"
        />
      </div>
      <nav>
        <ul>
          <Link to="/">
            <li>Home</li>
          </Link>
          {isLoggedIn ? (
            <>
              <Link
                to="/"
                onClick={() => {
                  logout();
                }}
              >
                <li>Logout</li>
              </Link>
              <Link to="/account">
                <li>Perfil</li>
              </Link>
            </>
          ) : (
            <Link to="/signin">
              <li>Login</li>
            </Link>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
