import React from "react";
import logo from "../logo.svg";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="App-header">
      <Link to="/">
        <img src={logo} className="App-logo" alt="logo" />
      </Link>
      <h1 className="App-title">리액트 페이지입니다</h1>
    </header>
  );
}

export default Header;
