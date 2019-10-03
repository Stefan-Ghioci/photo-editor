import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <b>PhotoEditor</b>
        </div>
        <div className="App-body">
          <div className="Menu">
              <ul className="List">
                <li className="Button">
                  NEW
                </li>
                <li className="Button">
                  SAVE
                </li>
                <li className="Button">
                  LOAD
                </li>
              </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
