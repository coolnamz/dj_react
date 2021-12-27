import React from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isAuthAtom } from "../Store";

import logo from "../logo.svg";

function Navbar() {
  const isAuth = useRecoilValue(isAuthAtom);

  return (
    <React.Fragment>
      {isAuth && (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link to="/" className="navbar-brand">
              <img
                src={logo}
                width="35"
                height="35"
                className="App-logo d-inline-block align-center"
                alt=""
              />
              React
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/" className="nav-link active" aria-current="page">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/dashboard" className="nav-link">
                    대시보드
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/posts" className="nav-link">
                    포스트
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/logout" className="nav-link">
                    로그아웃
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}
    </React.Fragment>
  );
}

export default Navbar;
