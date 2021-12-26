import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";

function Logout(props) {
  const navigate = useNavigate();
  // const [isAuth, setIsAuth] = useState(false);

  // useEffect(() => {
  //   if (localStorage.getItem("token") !== null) {
  //     setIsAuth(true);
  //   } else {
  //     setIsAuth(false);
  //   }
  // }, []);

  const handleLogout = (e) => {
    e.preventDefault();

    fetch("/auth/logout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.clear();
        navigate("/");
        props.setIsAuth(false);
        // window.location.replace("/");
      });
  };

  return (
    <div>
      <Fragment>
        <h1>Are you sure you want to logout?</h1>
        <input type="button" value="Logout" onClick={handleLogout} />
      </Fragment>
    </div>
  );
}

export default Logout;
