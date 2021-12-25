import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function SignupConfirm() {
  const { key } = useParams();
  const [verified, setVerified] = useState(true);

  return (
    <div>
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
    </div>
  );
}

export default SignupConfirm;
