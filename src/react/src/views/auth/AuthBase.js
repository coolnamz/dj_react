import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./Login";
import Signup from "./Signup";
import PassReset from "./PassReset";
import PassResetConfirm from "./PassResetConfirm";

function AuthBase() {
  return (
    <div>
      <Routes>
        <Route path="/">
          <Route index element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="password-reset" element={<PassReset />} />
          <Route
            path="password-reset/:uid/:token/confirm"
            element={<PassResetConfirm />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default AuthBase;
