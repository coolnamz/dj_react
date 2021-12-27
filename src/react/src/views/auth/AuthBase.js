import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { isAuthAtom } from "../../Store";
import Login from "./Login";
import Signup from "./Signup";
import SignupConfirm from "./SignupConfirm";
import EmailResend from "./EmailResend";
import EmailSended from "./EmailSended";
import PassReset from "./PassReset";
import PassResetConfirm from "./PassResetConfirm";
import PassResetDone from "./PassResetDone";
import CheckEmail from "./CheckEmail";

function AuthBase() {
  const isAuth = useRecoilValue(isAuthAtom);

  return (
    <div className="container">
      {!isAuth && (
        <div className="row align-items-center mx-1 my-5 height70">
          <div className="col-md-9 col-lg-7 col-xl-5 mx-auto">
            <div className="card back-shadow">
              <div className="card-header">
                <h1 align="center">example.com</h1>
              </div>

              <div className="card-body">
                <Routes>
                  <Route path="">
                    {/* Login */}
                    <Route index element={<Login />} />
                    {/* Account Singup & Verification */}
                    <Route path="auth/signup" element={<Signup />} />
                    <Route
                      path="auth/register/account-confirm-email/:key/confirm"
                      element={<SignupConfirm />}
                    />
                    <Route
                      path="auth/verification-email-sended"
                      element={
                        <EmailSended infoText="계정 확인을 위한 메일이 발송되었습니다." />
                      }
                    />
                    <Route path="auth/resend-mail" element={<EmailResend />} />
                    <Route
                      path="auth/resend-mail/email-sended"
                      element={
                        <EmailSended infoText="계정 인증 메일이 재발송되었습니다." />
                      }
                    />
                    {/* Password Reset */}
                    <Route path="auth/password-reset" element={<PassReset />} />
                    <Route
                      path="auth/password-reset/:uid/:token/confirm"
                      element={<PassResetConfirm />}
                    />
                    <Route
                      path="auth/password-reset/email-sended"
                      element={
                        <EmailSended infoText="비밀번호 재설정을 위한 메일이 발송되었습니다." />
                      }
                    />
                    <Route
                      path="auth/password-reset/done"
                      element={<PassResetDone />}
                    />
                    <Route path="auth/check-email" element={<CheckEmail />} />
                  </Route>
                </Routes>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AuthBase;
