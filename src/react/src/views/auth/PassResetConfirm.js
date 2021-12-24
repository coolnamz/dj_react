import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function PassResetConfirm() {
  const navigate = useNavigate();
  const { uid, token } = useParams();
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState(false);

  function resetPassword(inputData) {
    fetch("/api/auth/password/reset/confirm/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (/^새로운\s패스워드로/.test(data.detail)) {
          navigate("/password-reset/done");
        } else {
          setError(true);
        }
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let inputData = {
      uid: uid,
      token: token,
      new_password1: password1,
      new_password2: password2,
    };
    resetPassword(inputData);
  }

  return (
    <div>
      <div className="my-3 text-center">
        <h2>비밀번호 초기화</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mt-5 mx-4">
          <label className="form-label" htmlFor="email">
            새로운 비밀번호
          </label>{" "}
          <br />
          <input
            id="password1"
            name="password1"
            type="password"
            className="form-control"
            value={password1}
            required
            onChange={(e) => setPassword1(e.target.value)}
          />
        </div>{" "}
        <div className="my-4 mx-4">
          <label className="form-label" htmlFor="password">
            새로운 비밀번호 확인
          </label>
          <input
            id="password2"
            name="password2"
            type="password"
            className="form-control"
            value={password2}
            required
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
        {error && (
          <div className="login-content">
            <p className="text-danger text-center">
              <b>[초기화 실패]</b> 다시 초기화 이메일을 신청하기 바랍니다.
            </p>
          </div>
        )}
        <div className="d-grid col-10 col-lg-6 mt-5 mx-auto">
          <input
            className="btn btn-steelblue"
            type="submit"
            value="비밀번호 재설정"
          />
        </div>
      </form>
    </div>
  );
}

export default PassResetConfirm;
