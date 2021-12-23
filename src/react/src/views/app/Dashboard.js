import React, { useState, useEffect, Fragment } from "react";
import CheckAuth from "../auth/CheckAuth";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    CheckAuth(setIsAuth, setUserData);
  }, []);

  return (
    <div>
      {isAuth && (
        <Fragment>
          <h1>Dashboard</h1>
          <h2>Hello {userData && userData.email}!</h2>
        </Fragment>
      )}
    </div>
  );
};

export default Dashboard;
