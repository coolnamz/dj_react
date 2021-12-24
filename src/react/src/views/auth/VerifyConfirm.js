import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function VerifyConfirm() {
  const { key } = useParams();
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    emailConfirm();
  }, []);

  function emailConfirm() {
    const keyData = {
      key: key,
    };
    fetch("/api/auth/register/verify-email/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(keyData),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.detail === "ok") {
          setVerified(true);
        } else {
          setVerified(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      {verified ? (
        <div>
          <div className="my-3 text-center">
            <svg
              width="100"
              height="100"
              fill="currentColor"
              className="bi bi-check-circle text-success"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
            </svg>
          </div>
          <div className="mb-5 text-center">
            <h1 className="text-success">인증 완료</h1>
          </div>
          <div className="text-center">
            <p>계정에 대한 이메일 인증이 완료되었습니다.</p>
            <p>
              로그인을 위해서는 <b>관리자 인증</b>이 추가로 필요합니다.
            </p>
          </div>
        </div>
      ) : (
        <div>
          <div className="my-3 text-center">
            <svg
              width="100"
              height="100"
              fill="currentColor"
              className="bi bi-exclamation-diamond text-danger"
              viewBox="0 0 16 16"
            >
              <path d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 0 1 0-2.098L6.95.435zm1.4.7a.495.495 0 0 0-.7 0L1.134 7.65a.495.495 0 0 0 0 .7l6.516 6.516a.495.495 0 0 0 .7 0l6.516-6.516a.495.495 0 0 0 0-.7L8.35 1.134z" />
              <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
            </svg>
          </div>
          <div className="mb-5 text-center">
            <h1 className="text-danger">인증 실패</h1>
          </div>
          <div className="text-center">
            <p>계정에 대한 이메일 인증에 실패하였습니다.</p>
            <p>
              로그인을 위해서는 <b>관리자 인증</b>이 추가로 필요합니다.
            </p>
          </div>
          <div className="d-flex justify-content-center">
            <Link
              to="/resend-mail"
              type="button"
              className="btn btn-slategray col-8 col-lg-6"
            >
              인증 메일 재발송
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerifyConfirm;
