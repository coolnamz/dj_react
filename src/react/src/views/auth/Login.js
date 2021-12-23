import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(false);
  // const [isAuth, setIsAuth] = useState(false);

  // useEffect(() => {
  //   if (localStorage.getItem("token") !== null) {
  //     setIsAuth(true);
  //   } else {
  //     setIsAuth(false);
  //   }
  // }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const user = {
      email: email,
      password: password,
    };

    fetch("/api/auth/login/", {
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
          props.setIsAuth(true);
        } else {
          setEmail("");
          setPassword("");
          localStorage.clear();
          setErrors(true);
        }
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="mx-4 mt-5">
        <label className="form-label" htmlFor="email">
          이메일 주소
        </label>
        <input
          className="form-control"
          name="email"
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="my-4 mx-4">
        <label className="form-label" htmlFor="password">
          비밀번호
        </label>{" "}
        <br />
        <input
          className="form-control"
          name="password"
          type="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {errors === true && (
        <div className="login-content">
          <p className="text-danger text-center">
            <b>[로그인 실패]</b> 이메일 주소/비밀번호를 다시 확인해주세요.
          </p>
        </div>
      )}
      <div className="d-grid col-10 col-lg-6 mt-5 mx-auto">
        <input className="btn btn-primary" type="submit" value="로그인" />
      </div>
      <div className="my-4 text-center">
        <a href="">아이디 찾기</a> |{" "}
        <Link to="/password-reset"> 비밀번호 초기화</Link>
      </div>
      <div className="form-group text-center">
        계정이 없으신가요? <Link to="/signup">회원 가입</Link>
      </div>
      <div className="mb-4">
        <p className="text-center">
          회원 가입은 별도의 관리자 승인 절차가 필요합니다.
        </p>
      </div>
    </form>
  );
}

export default Login;
