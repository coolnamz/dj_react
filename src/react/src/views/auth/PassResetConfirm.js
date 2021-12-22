import React, { useState } from "react";
import { useParams } from "react-router-dom";

function PassResetConfirm() {
  const { uid, token } = useParams();
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  function resetPassword(inputData) {
    fetch("/api/auth/password/reset/confirm/", {
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
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">새로운 비밀번호:</label> <br />
        <input
          id="password1"
          name="password1"
          type="password"
          value={password1}
          required
          onChange={(e) => setPassword1(e.target.value)}
        />{" "}
        <br />
        <label htmlFor="password">새로운 비밀번호 확인:</label> <br />
        <input
          id="password2"
          name="password2"
          type="password"
          value={password2}
          required
          onChange={(e) => setPassword2(e.target.value)}
        />{" "}
        <br />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

export default PassResetConfirm;
