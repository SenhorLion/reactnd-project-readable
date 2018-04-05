import React from 'react';
import { Link } from 'react-router-dom';
import cuid from 'cuid';
import { capitalize } from '../../utils/helper';

const Header = ({ categories, currentPath }) => {
  const category = currentPath.split('/');
  const categoryDisplay = category[1];

  return (
    <div className="ui fixed inverted menu app-header">
      <div className="ui container">
        <Link to="/" className="header item">
          <i className="logo inverted quote left icon" />
          READABLE
        </Link>

        <div className="ui simple dropdown item ">
          Categories <i className="dropdown icon" />
          <div className="menu category-menu">
            {categories &&
              categories.map(cat => (
                <Link
                  key={cuid()}
                  className={`item ${cat.name === category && 'active'}`}
                  to={`/${cat.path}`}
                >
                  {cat.name === categoryDisplay && (
                    <i className="tiny check icon" />
                  )}{' '}
                  {capitalize(cat.name)}
                </Link>
              ))}
            <Link key={cuid()} to={`/`} className="item">
              All Categories
            </Link>
          </div>
        </div>

        <div className="ui header item header-category">
          {categoryDisplay && `Category ${capitalize(categoryDisplay)}`}
        </div>
      </div>
    </div>
  );
};

export default Header;
