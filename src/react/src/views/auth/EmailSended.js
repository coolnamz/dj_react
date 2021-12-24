import React from "react";
import { Link } from "react-router-dom";

function EmailSended() {
  return (
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
        <h1 className="text-success">메일 발송 완료</h1>
      </div>
      <div className="text-center">
        <p>계정 확인을 위한 메일이 발송되었습니다.</p>
        <p>귀하의 이메일을 확인하여 주세요.</p>
      </div>
      <div className="d-flex justify-content-center">
        <Link to="/" type="button" className="btn btn-slategray col-8 col-lg-6">
          뒤로 이동
        </Link>
      </div>
    </div>
  );
}

export default EmailSended;
