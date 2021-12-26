import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";

function ResendMail() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function sendEmail(inputData) {
    setLoading(true);
    fetch("/auth/register/resend-email/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.detail === "ok") {
          navigate("/resend-mail/email-sended");
        } else {
          setError(data.detail);
        }
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
        <h2>인증 메일 재발송</h2>
      </div>

      <div className="form-group">
        <div className="my-3 text-center">
          <p>계정에 대한 인증을 위한 메일을 재발송합니다.</p>
        </div>
        {loading ? (
          <div className="d-flex justify-content-center my-5">
            <LoadingSpinner />
          </div>
        ) : (
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
        )}

        {error && (
          <div className="login-content">
            <p className="text-danger text-center">
              <b>[이메일 발송 실패]</b> {error}
            </p>
          </div>
        )}
        <div className="d-flex justify-content-center">
          <button
            type="submit"
            className={
              "btn btn-seagreen col-5 col-lg-3 " + (loading ? "disabled" : "")
            }
          >
            재발송
          </button>
          &emsp;
          <button
            onClick={() => navigate(-1)}
            className={
              "btn btn-slategray col-5 col-lg-3 " + (loading ? "disabled" : "")
            }
          >
            취소
          </button>
        </div>
      </div>
    </form>
  );
}

export default ResendMail;
