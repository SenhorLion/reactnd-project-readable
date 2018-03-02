import React, { Component } from 'react';
import { connect } from 'react-redux';
import cuid from 'cuid';
import './App.css';
import { capitalize } from '../../utils/helper';
import { fetchAllCategories } from '../../actions';

class App extends Component {
  state = {
    error: null,
  };

  componentDidMount() {
    this.props.dispatch(fetchAllCategories());
  }

  render() {
    const { categories } = this.props;

    console.log('App::categories', categories);

    return (
      <div className="app">
        <div className="ui fixed inverted menu">
          <div className="ui container">
            <a href="#" className="header item">
              <i className="logo inverted quote left icon" />
              READABLE
            </a>

            <div className="ui simple dropdown item">
              Categories <i className="dropdown icon" />
              <div className="menu">
                {categories &&
                  categories.map(cat => (
                    <a key={cuid()} className="item" href="#">
                      {cat.name}
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div className="ui main text container">
          <h1 className="ui header">Readable App</h1>
          <p>This is a basic fixed menu template using Semantic UI.</p>
          <i className="spinner loading icon" />

          {categories &&
            categories.map(cat => (
              <h3 key={cuid()} className="item" href="#">
                {cat.name}
              </h3>
            ))}
        </div>
      </div>
    );
  }
}

// const mapDispatchToProps = dispatch => ({
//   myAction() {
//     dispatch(API.getAllCategories())
//   }
// });

const mapStateToProps = ({ categories }) => ({
  categories,
});

// connect([ mapStateToProps], [mapDispatchToProps], [mergeProps], [options])(Component);

export default connect(mapStateToProps)(App);
