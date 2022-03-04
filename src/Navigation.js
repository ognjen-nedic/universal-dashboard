import React from "react";
import { NavLink } from "react-router-dom";
const logoSrc = "/images/universal-logo-small.png";

const Navigation = () => {
  return (
    <nav className="navigation">
      {/* <ul>
        <li>
          <img src={logoSrc} alt="Logo" />
        </li>
        <li>
          <NavLink to="/users">Users</NavLink>
        </li>
        <li>
          <NavLink to="/developers">Developers</NavLink>
        </li>
        <li>
          <NavLink to="/clients">Clients</NavLink>
        </li>
        <li>
          <NavLink to="/my-profile">My profile</NavLink>
        </li>
      </ul> */}
        <img src={logoSrc} alt="Logo" />
        <NavLink to="/users">Users</NavLink>
        <NavLink to="/developers">Developers</NavLink>
        <NavLink to="/clients">Clients</NavLink>
        <NavLink to="/my-profile">My profile</NavLink>
    </nav>
  );
};

export default Navigation;
