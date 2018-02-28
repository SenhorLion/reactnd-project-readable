import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <div class="ui fixed inverted menu">
          <div class="ui container">
            <a href="#" class="header item">
              <img class="logo" src="assets/images/logo.png" />
              Readable App
            </a>
            <a href="#" class="item">
              Home
            </a>
            <div class="ui simple dropdown item">
              Categories <i class="dropdown icon" />
              <div class="menu">
                <a class="item" href="#">
                  Link Item
                </a>
                <a class="item" href="#">
                  Link Item
                </a>
                <div class="divider" />
                <div class="header">Header Item</div>
                <div class="item">
                  <i class="dropdown icon" />
                  Sub Menu
                  <div class="menu">
                    <a class="item" href="#">
                      Link Item
                    </a>
                    <a class="item" href="#">
                      Link Item
                    </a>
                  </div>
                </div>
                <a class="item" href="#">
                  Link Item
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="ui main text container">
          <h1 class="ui header">Readable App</h1>
          <p>This is a basic fixed menu template using Semantic UI.</p>
        </div>
      </div>
    );
  }
}

export default App;
