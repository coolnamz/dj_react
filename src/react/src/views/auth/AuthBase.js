import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./Login";
import Signup from "./Signup";
import PassReset from "./PassReset";
import PassResetConfirm from "./PassResetConfirm";
import VerifyConfirm from "./VerifyConfirm";
import ResendMail from "./ResendMail";
import EmailSended from "./EmailSended";

function AuthBase(props) {
  return (
    <div className="container">
      <div className="row align-items-center mx-1 my-5 height70">
        <div className="col-md-9 col-lg-7 col-xl-5 mx-auto">
          <div className="card back-shadow">
            <div className="card-header">
              <h1 align="center">example.com</h1>
            </div>

            <div className="card-body">
              <Routes>
                <Route path="/">
                  <Route
                    index
                    element={<Login setIsAuth={props.setIsAuth} />}
                  />
                  <Route path="signup" element={<Signup />} />
                  <Route path="password-reset" element={<PassReset />} />
                  <Route
                    path="password-reset/:uid/:token/confirm"
                    element={<PassResetConfirm />}
                  />
                  <Route
                    path="api/auth/register/account-confirm-email/:key/confirm"
                    element={<VerifyConfirm />}
                  />
                  <Route path="resend-mail" element={<ResendMail />} />
                  <Route
                    path="/verification-email-sended"
                    element={<EmailSended />}
                  />
                </Route>
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthBase;
