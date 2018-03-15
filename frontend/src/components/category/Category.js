import React from 'react';
import cuid from 'cuid';
import Loading from 'react-loading';

import Header from '../header/Header';

const Category = ({ category, posts, categories }) => {
  return (
    <div>
      <Header categories={categories} />

      <div className="ui grid">
        <div className="row">
          <div className="column">
            <h1>Category Page</h1>
            <p>Category: {category}</p>
            {posts &&
              posts.map(post => (
                <div key={cuid()}>
                  <p>{post.title}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
