import React from 'react';
import { Link } from 'react-router-dom';
import cuid from 'cuid';
import { capitalize } from '../../utils/helper';

const Header = ({ categories }) => {
  return (
    <div className="ui fixed inverted menu">
      <div className="ui container">
        <Link to="/" className="header item">
          <i className="logo inverted quote left icon" />
          READABLE
        </Link>

        <div className="ui simple dropdown item">
          Categories <i className="dropdown icon" />
          <div className="menu">
            {categories &&
              categories.map(cat => (
                <Link key={cuid()} className="item" to={`/${cat.path}`}>
                  {capitalize(cat.name)}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
