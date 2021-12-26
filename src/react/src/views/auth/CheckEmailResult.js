import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CheckEmailResult({ accountState, email }) {
  const navigate = useNavigate();
  const [accountDetail, setAccountDetail] = useState({
    user_verify: "",
    root_verify: "",
    resend_mail: false,
    request_root: false,
  });

  useEffect(() => {
    makeAccountDetail(accountState);
  }, []);

  function makeAccountDetail(accountState) {
    if (accountState === "not_verified") {
      const info = {
        user_verify: false,
        root_verify: false,
      };
      setAccountDetail(info);
    } else if (accountState === "user_only") {
      const info = {
        user_verify: true,
        root_verify: false,
      };
      setAccountDetail(info);
    } else {
      const info = {
        user_verify: true,
        root_verify: true,
      };
      setAccountDetail(info);
    }
  }

  function sendEmail(e) {
    e.preventDefault();

    fetch("/auth/register/resend-email/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.detail === "ok") {
          navigate("/resend-mail/email-sended");
        } else {
          setError(data.detail);
        }
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function requestToVerify(e) {
    e.preventDefault();

    fetch("/auth/account-activate-root/resend-mail/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.detail === "ok") {
          navigate("/resend-mail/email-sended");
        } else {
          setError(data.detail);
        }
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <h1></h1>
      <table className="table my-5">
        <thead>
          <tr>
            <th scope="col" colSpan="2">
              {email}
            </th>
            <th scope="col" className="text-center">
              상태
            </th>
            <th scope="col" className="text-center">
              재요청
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>가입 상태</td>
            <td className="text-center text-success">
              <b>가입됨</b>
            </td>
            <td className="text-center"></td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>사용자 이메일 인증</td>
            <td
              className={
                "text-center " +
                (accountDetail.user_verify ? "text-success" : "text-danger")
              }
            >
              <b>{accountDetail.user_verify ? "완료" : "미완료"}</b>
            </td>
            <td className="text-center">
              {accountState === "not_verified" && (
                <button
                  className="badge btn-steelblue"
                  onClick={(e) => sendEmail(e)}
                >
                  재발송
                </button>
              )}
            </td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>관리자 승인</td>
            <td
              className={
                "text-center " +
                (accountDetail.root_verify ? "text-success" : "text-danger")
              }
            >
              <b>{accountDetail.root_verify ? "완료" : "미완료"}</b>
            </td>
            <td className="text-center">
              {accountState === "user_only" && (
                <button
                  className="badge btn-steelblue"
                  onClick={(e) => requestToVerify(e)}
                >
                  재신청
                </button>
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="d-flex justify-content-center">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="btn btn-slategray col-5 col-lg-3 "
        >
          뒤로 이동
        </button>
      </div>
    </div>
  );
}

export default CheckEmailResult;
