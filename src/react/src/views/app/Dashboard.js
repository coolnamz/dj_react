import React, { useState, useEffect, Fragment } from "react";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  return (
    <div>
      <Fragment>
        <h1>Dashboard</h1>
        <h2>Hello {userData && userData.email}!</h2>
      </Fragment>
    </div>
  );
};

export default Dashboard;
