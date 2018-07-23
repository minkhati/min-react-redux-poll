import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Nav(props) {
  const { name, avatarURL } = props.user;
  return (
    <nav className="nav">
      <ul>
        <li>
          <NavLink to="/" exact activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/new" activeClassName="active">
            New Question
          </NavLink>
        </li>
        <li>
          <NavLink to="/leaderBoard" activeClassName="active">
            Leader Board
          </NavLink>
        </li>
        {name && <li>Hello, {name} </li>}
        {avatarURL && (
          <li>
            <img
              src={avatarURL}
              alt={`Avatar of ${name}`}
              className="nav-avatar"
            />
          </li>
        )}
        <li>
          <NavLink to="/logout" exact activeClassName="active">
            Logout
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
