import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'
import DemoBook from './ImageBook/ImageBook';

class App extends Component {
  constructor() {
    super();
    this.state = {
      value: '1',
    }
  }

  render() {
    return (
      <div className="App" >
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
        </header> */}
        <div style={{ margin: '3rem' }}>
          <DemoBook></DemoBook>
        </div>
      </div>
    );
  }
}

export default App;
