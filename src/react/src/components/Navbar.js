import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      setIsAuth(true);
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Post Page
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
            {isAuth === true ? (
              <Fragment>
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
                  <Link to="/auth/logout" className="nav-link">
                    로그아웃
                  </Link>
                </li>
              </Fragment>
            ) : (
              <Fragment>
                <li className="nav-item">
                  <Link to="/auth/login" className="nav-link">
                    로그인
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/auth/signup" className="nav-link">
                    회원가입
                  </Link>
                </li>
              </Fragment>
            )}
          </ul>
        </div>
      </div>
    </nav>

    // <nav>
    //   <h1>Django React Auth</h1>
    //   <ul>
    //     {isAuth === true ? (
    //       <Fragment>
    //         {" "}
    //         <li>
    //           <Link to="/posts">Dashboard</Link>
    //         </li>
    //         <li>
    //           <Link to="/auth/logout">Logout</Link>
    //         </li>
    //       </Fragment>
    //     ) : (
    //       <Fragment>
    //         {" "}
    //         <li>
    //           <Link to="/auth/login">Login</Link>
    //         </li>
    //         <li>
    //           <Link to="/auth/signup">Signup</Link>
    //         </li>
    //       </Fragment>
    //     )}
    //   </ul>
    // </nav>
  );
}

export default Navbar;
