import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function PassReset() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);

  function sendEmail(inputData) {
    fetch("/api/auth/password/reset/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    })
      .then((res) => res.json())
      .then((data) => {
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
        <h2>비밀번호 초기화</h2>
      </div>
      <div className="my-3 text-center">
        <p>이메일로 비밀번호 초기화를 위한 링크를 보내드립니다.</p>
      </div>
      <div className="form-group">
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
            초기화
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
    </form>
  );
}

export default PassReset;
