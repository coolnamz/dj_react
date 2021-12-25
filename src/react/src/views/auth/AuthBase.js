import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./Login";
import Signup from "./Signup";
import SignupConfirm from "./SignupConfirm";
import EmailResend from "./EmailResend";
import EmailSended from "./EmailSended";
import PassReset from "./PassReset";
import PassResetConfirm from "./PassResetConfirm";
import PassResetDone from "./PassResetDone";

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
                  {/* Login */}
                  <Route
                    index
                    element={<Login setIsAuth={props.setIsAuth} />}
                  />
                  {/* Account Singup & Verification */}
                  <Route path="signup" element={<Signup />} />
                  <Route
                    path="api/auth/register/account-confirm-email/:key/confirm"
                    element={<SignupConfirm />}
                  />
                  <Route
                    path="verification-email-sended"
                    element={
                      <EmailSended infoText="계정 확인을 위한 메일이 발송되었습니다." />
                    }
                  />
                  <Route path="/resend-mail" element={<EmailResend />} />
                  <Route
                    path="resend-mail/email-sended"
                    element={
                      <EmailSended infoText="계정 인증 메일이 재발송되었습니다." />
                    }
                  />
                  {/* Password Reset */}
                  <Route path="password-reset" element={<PassReset />} />
                  <Route
                    path="api/auth/password-reset/:uid/:token/confirm"
                    element={<PassResetConfirm />}
                  />
                  <Route
                    path="password-reset/email-sended"
                    element={
                      <EmailSended infoText="비밀번호 재설정을 위한 메일이 발송되었습니다." />
                    }
                  />
                  <Route
                    path="password-reset/done"
                    element={<PassResetDone />}
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
