import React from "react";
import logo from "../logo.svg";

function Header() {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">리액트 페이지입니다</h1>
    </header>
  );
}

export default Header;
