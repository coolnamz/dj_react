import React, { useState, useEffect, Fragment } from "react";
import checkAuth from "../auth/checkAuth";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [authenticated, setAuth] = useState(false);

  useEffect(() => {
    checkAuth(setAuth, setUserData);
  }, []);

  return (
    <div>
      {authenticated && (
        <Fragment>
          <h1>Dashboard</h1>
          <h2>Hello {userData && userData.email}!</h2>
        </Fragment>
      )}
    </div>
  );
};

export default Dashboard;
