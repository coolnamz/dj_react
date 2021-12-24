import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cookie from "react-cookies";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [first_name, setFirstName] = useState("");
  const [errors, setErrors] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    const user = {
      email: email,
      password1: password1,
      password2: password2,
      first_name: first_name,
    };

    fetch("/api/auth/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.key) {
          localStorage.clear();
          localStorage.setItem("token", data.key);
          navigate("/");
        } else {
          setEmail("");
          setPassword1("");
          setPassword2("");
          setFirstName("");
          localStorage.clear();
          setErrors("회원 가입에 실패하였습니다.");
        }
        if (/확인\s이메일/.test(data.detail)) {
          navigate("/verification-email-sended");
        } else if (/이미\s이\s이메일/.test(data.email)) {
          setErrors("이미 가입한 이메일 주소입니다.");
        } else {
          setErrors("회원 가입에 실패하였습니다.");
        }

        console.log(data);
      });
  };

  return (
    <div>
      <div className="my-3 text-center">
        <h2>회원 가입</h2>
      </div>
      <div className="my-3 text-center">
        <p className="my-0 py-1">
          이메일 인증이 필요하고, 그 후 관리자 승인이 필요합니다.
        </p>
        <p className="my-0 py-1">
          아직 이메일 인증이 완료되지 않았다면
          <Link to="/resend-mail"> 인증메일 재발송</Link>
        </p>
        <p className="my-0 py-1">관리자 승인까지 시간이 소요될 수 있습니다.</p>
      </div>

      <form onSubmit={onSubmit}>
        <div className="my-3 mx-4">
          <label className="form-label" htmlFor="email">
            이메일 주소
          </label>
          <input
            className="form-control"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="my-3 mx-4">
          <label className="form-label" htmlFor="password1">
            비밀번호
          </label>
          <input
            className="form-control"
            name="password1"
            type="password"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
            required
          />
        </div>
        <div className="my-3 mx-4">
          <label className="form-label" htmlFor="password2">
            비밀번호 재입력
          </label>
          <input
            className="form-control"
            name="password2"
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
        </div>
        <div className="my-3 mx-4">
          <label className="form-label" htmlFor="password2">
            이름
          </label>
          <input
            className="form-control"
            name="first_name"
            type="text"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="text-center text-danger">
          {errors && (
            <p>
              <b>[가입 실패]</b>
              {errors}
            </p>
          )}
        </div>
        <div className="d-flex justify-content-center mt-4">
          <button
            type="submit"
            className="btn btn-primary btn-seagreen col-5 col-lg-3"
          >
            가입 신청
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
      </form>
    </div>
  );
}

export default Signup;
