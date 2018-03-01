import React, { Component } from 'react';
import './App.css';
import { capitalize } from '../utils/helper';
import { fetchCategories } from '../api/api';

class App extends Component {
  state = {
    categories: null,
    error: null,
  };

  componentDidMount() {
    // fetch data
    // TODO: handle error catch
    fetchCategories()
      .then(data => {
        this.setState(() => ({
          categories: data,
        }));
      })
      .catch(error => {
        console.log('error', error);

        this.setState(() => ({
          error,
        }));
      });
  }

  render() {
    const { categories } = this.state;

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
                    <a key={cat.name} className="item" href="#">
                      {capitalize(cat.name)}
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
        </div>
      </div>
    );
  }
}

export default App;
