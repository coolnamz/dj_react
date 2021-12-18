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
      <p className="App-intro">안녕하세요. 리액트 페이지입니다.</p>
      <Posts />
    </div>
  );
};

export default App;
