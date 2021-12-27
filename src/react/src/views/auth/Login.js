import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isAuthAtom } from "../../Store";

function Login(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const setIsAuth = useSetRecoilState(isAuthAtom);
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

    fetch("/auth/login/", {
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
          setIsAuth(true);
          navigate("/");
        } else {
          setEmail("");
          setPassword("");
          localStorage.clear();
          setErrors("로그인 중 오류 발생");
        }
        if (data.non_field_errors) {
          if (/^이메일\s주소/.test(data.non_field_errors)) {
            setErrors("계정 인증이 완료되지 않았습니다.");
          } else if (/^주어진\s자격/.test(data.non_field_errors[0])) {
            setErrors("이메일 주소/비밀번호를 다시 확인해주세요.");
          } else {
            setErrors("로그인 중 오류 발생");
          }
        }
      })
      .catch((err) => {
        console.log(err);
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
      {errors && (
        <div className="login-content text-center">
          <p className="text-danger">
            <b>[로그인 실패]</b> {errors}
          </p>
        </div>
      )}
      <div className="d-grid col-10 col-lg-6 my-5 mx-auto">
        <input className="btn btn-steelblue" type="submit" value="로그인" />
      </div>
      <div className="my-3 text-center">
        <Link to="/auth/check-email"> 이메일 확인</Link> |
        <Link to="/auth/password-reset"> 비밀번호 초기화</Link>
      </div>
      <div className="form-group text-center">
        계정이 없으신가요? <Link to="/auth/signup">회원 가입</Link>
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
