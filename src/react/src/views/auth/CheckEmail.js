import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckEmailResult from "./CheckEmailResult";

function CheckEmail() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [accountState, setAccountState] = useState("");

  function sendEmail(inputData) {
    fetch("/auth/check-email/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    })
      .then((res) => res.json())
      .then((data) => {
        setAccountState(data);
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
        <h2>이메일 계정 확인</h2>
      </div>

      <div className="form-group">
        <div className="my-3 text-center">
          <p>계정의 가입 상태와 승인 상태를 확인합니다.</p>
        </div>

        {accountState && accountState !== "wrong_address" ? (
          <CheckEmailResult accountState={accountState} email={email} />
        ) : (
          <React.Fragment>
            <div className="my-5 mx-3">
              <label className="form-label" htmlFor="title"></label>
              <input
                type="text"
                id="title"
                name="title"
                className={
                  "form-control" +
                  (accountState === "wrong_address" ? " is-invalid" : "")
                }
                placeholder="가입 시 등록한 이메일 주소를 입력해주세요"
                required="required"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="invalid-feedback">
                {accountState === "wrong_address"
                  ? "가입 정보가 없는 이메일 주소입니다."
                  : ""}
              </div>
            </div>

            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className="btn btn-seagreen col-5 col-lg-3 "
              >
                확인
              </button>
              &emsp;
              <button
                onClick={() => navigate(-1)}
                className="btn btn-slategray col-5 col-lg-3 "
              >
                취소
              </button>
            </div>
          </React.Fragment>
        )}
      </div>
    </form>
  );
}

export default CheckEmail;
