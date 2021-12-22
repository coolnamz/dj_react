import React, { useState } from "react";

function PassReset() {
  const [email, setEmail] = useState(null);

  function sendEmail(inputData) {
    fetch("/api/auth/password/reset/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    })
      .then((response) => {
        return response.json();
      })
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
    <form className="col-lg-6 mx-auto my-3 text-left" onSubmit={handleSubmit}>
      <div className="form-group">
        <div className="mb-3">
          <label className="form-label" htmlFor="title">
            이메일
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            placeholder="이메일 주소를 입력해주세요"
            required="required"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="invalid-feedback">{}</div>
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary col-5 col-lg-3">
            초기화
          </button>
          &emsp;
          <button type="button" className="btn btn-warning col-5 col-lg-3">
            취소
          </button>
        </div>
      </div>
    </form>
  );
}

export default PassReset;
