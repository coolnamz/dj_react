import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Posts } from "./posts/Posts";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <h1>App.js</h1>
      <p className="App-intro">Build된 javascript 파일을 잘 읽어왔습니다</p>
      <hr />
      <Posts />
    </div>
  );
};

export default App;
