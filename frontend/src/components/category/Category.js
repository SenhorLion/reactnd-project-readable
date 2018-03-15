import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPostsByCategory } from '../../actions/post-action-creators';

import Header from '../header/Header';

class Category extends Component {
  render() {
    const { categories, posts } = this.props;
    const { category } = this.props.match.params;

    const categoryPosts = Object.values(posts).filter(
      post => post.category === category
    );

    return (
      <div>
        <Header categories={categories} />
        <div className="ui grid">
          <div className="row">
            <div className="column">
              <h1>Category Page</h1>
              <p>Category: {category}</p>
              {categoryPosts &&
                categoryPosts.map(post => (
                  <div>
                    <p>{post.title}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Category;
