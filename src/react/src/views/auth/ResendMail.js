import React, { useState } from "react";
import { Link } from "react-router-dom";

function ResendMail() {
  const [email, setEmail] = useState(null);
  const [sended, setSended] = useState(false);

  function sendEmail(inputData) {
    fetch("/api/auth/register/resend-email/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.detail === "ok") {
          setSended(true);
        }
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendEmail({
      email: email,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="my-3 text-center">
        <h2>인증 메일 재발송</h2>
      </div>

      {!sended ? (
        <div className="form-group">
          <div className="my-3 text-center">
            <p>계정에 대한 인증을 위한 메일을 재발송합니다.</p>
          </div>
          <div className="my-5 mx-3">
            <label className="form-label" htmlFor="title"></label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              placeholder="가입 시 등록한 이메일 주소를 입력해주세요"
              required="required"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="invalid-feedback">{}</div>
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-seagreen col-5 col-lg-3">
              재발송
            </button>
            &emsp;
            <Link
              to="/"
              type="button"
              className="btn btn-slategray col-5 col-lg-3"
            >
              취소
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="mt-5 text-center">
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
          <div className="my-3 mx-3 text-center text-success">
            <h5>발송이 완료되었습니다.</h5>
          </div>
          <div className="d-flex justify-content-center">
            <Link
              to="/"
              type="button"
              className="btn btn-slategray col-8 col-lg-6"
            >
              뒤로 이동
            </Link>
          </div>
        </div>
      )}
    </form>
  );
}

export default ResendMail;
